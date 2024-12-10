import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import AuthContext from "./contexts.js";
import { useNavigate, Link } from "react-router-dom";
import { setAuthToken } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import PhoneNumberInput from "./PhoneNumberInput";
import AddressSelect from "./AddressSelect";
import BirthdayDropdown from "./BirthdayDropdown";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // 確保你已經初始化了 Firestore
import { loadMemberData, setMemberData } from "./memberSlice";

function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser } = useContext(AuthContext);

  const memberData = useSelector((state) => state.member.data);
  const [editedData, setEditedData] = useState(memberData || {});
  const isSaving = useSelector((state) => state.member.isSaving);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // 手機號碼
  const [memberSelectedCode, setMemberSelectedCode] = useState("");
  const [memberCountryAbbr, setMemberCountryAbbr] = useState("");
  // 收件人電話
  const [receiverSelectedCode, setReceiverSelectedCode] = useState("");
  const [receiverCountryAbbr, setReceiverCountryAbbr] = useState("");
  // 生日日期
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // 生成年、月、日選項
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i); // 100 年選項
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12 月
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1-31 日
  // 國家、縣市、地區
  const [selectedCountry, setSelectedCountry] = useState(""); //國家&&下拉式選單
  const [selectedCity, setSelectedCity] = useState(""); //城市&&下拉式選單
  const [selectedArea, setSelectedArea] = useState(""); //地區&&下拉式選單
  const [cityInputvalue, setCityInputValue] = useState(""); //國家不為台灣時城市欄位的inputvalue狀態
  const [areaInputvalue, setAreaInputValue] = useState(""); //國家不為台灣時地區欄位的inputvalue狀態
  const [phoneInputValue, setPhoneInputValue] = useState(""); // 純號碼輸入框的值
  const [receiverPhoneInputValue, setReceiverPhoneInputValue] = useState("");


  // 在應用啟動時將資料加載到 Redux 並存在本地快取中(localStorage)再獲取資料並同步到Redux，不用每次都向 Firebase 發送請求。
  useEffect(() => {
    const cachedData = localStorage.getItem(`memberData_${user.uid}`);
    if (cachedData) {
      dispatch(loadMemberData(JSON.parse(cachedData)));
    } else if (user.uid) {
      dispatch(loadMemberData(user.uid)).then((data) => {
        localStorage.setItem(`memberData_${user.uid}`, JSON.stringify(data));
      });
    }
  }, [user, dispatch]);

  // 加載用戶的會員資料
  useEffect(() => {
    if (user?.uid) {
      dispatch(loadMemberData(user.uid));
    }
  }, [dispatch, user]);

  // 登出(清空AuthToken user cart 跳轉回首頁)
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setAuthToken("");
      setUser(null);
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      console.error("登出失敗：", error);
    }
  };

  // 同步更新資料
  useEffect(() => {
    if (memberData && !isDataFetched) {
      setSelectedCountry(memberData.country || "");
      setSelectedCity(memberData.city || "");
      setSelectedArea(memberData.area || "");
      setCityInputValue(memberData.city || "");
      setAreaInputValue(memberData.area || "");

      setMemberSelectedCode(memberData.selectedCode || "");
      setMemberCountryAbbr(memberData.countryAbbr || "");
      setPhoneInputValue(memberData.phoneNumber || "");

      setReceiverSelectedCode(memberData.selectedCode || "");
      setReceiverCountryAbbr(memberData.countryAbbr || "");
      setReceiverPhoneInputValue(memberData.receiverPhone || "");

      setSelectedYear(memberData.year || "");
      setSelectedMonth(memberData.month || "");
      setSelectedDay(memberData.day || "");

      setIsDataFetched(true);
      setEditedData(memberData);
    }
  }, [user, memberData]);

  // 更新資料的函數
  const updateData = (updatedData) => {
    dispatch(setMemberData(updatedData)); // 更新資料
  };

  // 更新儲存的資料
  const handleSaveChanges = async () => {
    if (isSaving) {
      console.log("正在保存資料，請稍候...");
      return;
    }
    if (user && editedData) {
      try {
        const updatedData = {
          country: selectedCountry || "",
          city: selectedCity || "",
          area: selectedArea || "",
          year: selectedYear || "",
          month: selectedMonth || "",
          day: selectedDay || "",
          selectedCode: memberSelectedCode&&receiverSelectedCode||"",
          countryAbbr: memberCountryAbbr&&receiverCountryAbbr||"",
          phoneNumber: phoneInputValue || "",
          receiverName: editedData?.receiverName || "",
          receiverPhone: receiverPhoneInputValue || "",
          addressStreet: editedData?.addressStreet || "",
          notes: editedData?.notes || "",
        };

        const userRef = doc(db, "members", user.uid); // 透過用戶的uid創建or更新文件
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // 如果此用戶的資料已存在，更新資料
          await updateDoc(userRef, updatedData);
          console.log("資料更新成功");
        } else {
          // 如果此用戶的資料不存在，創建新文件並寫入資料
          await setDoc(userRef, updatedData);
          console.log("資料創建成功");
        }
        updateData(updatedData); // 使用 updateData 更新 Redux
        setEditedData(updatedData); // 更新本地的 editedData
        alert("資料已成功儲存！");
      } catch (error) {
        console.error("儲存變更失敗：", error);
        alert("儲存變更失敗，請再試一次！");
      }
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value || "",
    }));

    if (field === "country") {
      setSelectedCountry(value || "");
    }
    if (field === "city") {
      setSelectedCity(value || "");
      setCityInputValue(value || "");
    }
    if (field === "area") {
      setSelectedArea(value || "");
      setAreaInputValue(value || "");
    }
    if (field === "phoneNumber") {
      setPhoneInputValue(value || "");
      setMemberSelectedCode(memberSelectedCode||"");
      setMemberCountryAbbr(memberCountryAbbr || "");
    }
    if (field === "receiverPhone") {
      setReceiverPhoneInputValue(value || "");
      setReceiverSelectedCode(receiverSelectedCode||"");
      setReceiverCountryAbbr(receiverCountryAbbr||"");
    }
    if (field === "year") {
      setSelectedYear(value || "");
    }
    if (field === "month") {
      setSelectedMonth(value || "");
    }
    if (field === "day") {
      setSelectedDay(value || "");
    }
  };

  return (
    <>
      <div className="personal-info  flex flex-col justify-center h-20 p-4 max-w-60">
        <h1 className="flex text-lg items-center space-x-16 w-auto">
          {`你好${user?.email}`}
          <Link
            to="/"
            onClick={handleLogout}
            className="text-red-500 hover:underline w-full cursor-pointer text-lg ml-6"
          >
            登出
          </Link>
        </h1>
      </div>
      <div className="p-4 bg-white rounded shadow-md w-full">
        <div className="flex space-x-5">
          <div className="border p-5 w-1/2 h-auto">
            <h2 className="text-xl font-bold">會員資料</h2>

            <div className="mb-2">
              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-20 mr-9">電子郵件</span>
                <span className="border px-2 py-2 w-full">{user.email}</span>
              </div>

              <div className="flex items-center h-5 font-semibold mt-10">
                <span className="flex w-20 mr-9">手機號碼</span>
                <PhoneNumberInput
                  selectedCode={memberSelectedCode}
                  setSelectedCode={(value) => setMemberSelectedCode(value)}
                  countryAbbr={memberCountryAbbr}
                  setCountryAbbr={(value) => setMemberCountryAbbr(value)}
                  value={phoneInputValue}
                  onChange={(value) => handleInputChange("phoneNumber", value)}
                />
              </div>

              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-20 mr-9">生日日期(選填)</span>
                <div className="flex w-full">
                  <BirthdayDropdown
                    label="年"
                    items={years}
                    selectedItem={selectedYear}
                    onSelect={(value) => {
                      setSelectedYear(value);
                      handleInputChange("year", value);
                    }}
                  />
                  <BirthdayDropdown
                    label="月"
                    items={months}
                    selectedItem={selectedMonth}
                    onSelect={(value) => {
                      setSelectedMonth(value);
                      handleInputChange("month", value);
                    }}
                  />
                  <BirthdayDropdown
                    label="日"
                    items={days}
                    selectedItem={selectedDay}
                    onSelect={(value) => {
                      setSelectedDay(value);
                      handleInputChange("day", value);
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-20 mr-9">
                  備註
                  <br />
                  (選填)
                </span>
                <input
                  className="border px-2 py-2 w-full"
                  type="text"
                  value={editedData?.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>

              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-auto py-3 mr-9">密碼</span>
                <a href="" className="ml-8 py-3 text-red-500 cursor-pointer">
                  設定新的密碼
                </a>
              </div>
            </div>
          </div>

          <div className="border p-5 w-1/2 h-auto">
            <h2 className="text-xl font-bold">配送與付款資訊</h2>
            <div className="mb-2">
              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-20 mr-5">收件人</span>
                <input
                  className="border px-2 py-2 w-full"
                  type="text"
                  value={editedData?.receiverName || ""}
                  onChange={(e) =>
                    handleInputChange("receiverName", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-20 mr-5">
                  收件人
                  <br />
                  電話號碼
                </span>
                <PhoneNumberInput
                  selectedCode={receiverSelectedCode}
                  setSelectedCode={(value) => setReceiverSelectedCode(value)}
                  countryAbbr={receiverCountryAbbr}
                  setCountryAbbr={(value) => setReceiverCountryAbbr(value)}
                  value={receiverPhoneInputValue}
                  onChange={(value) =>
                    handleInputChange("receiverPhone", value)
                  }
                />
              </div>
              <AddressSelect
                selectedCountry={selectedCountry}
                setSelectedCountry={(country) =>
                  handleInputChange("country", country)
                }
                selectedCity={selectedCity}
                setSelectedCity={(city) => handleInputChange("city", city)}
                selectedArea={selectedArea}
                setSelectedArea={(area) => handleInputChange("area", area)}
                cityValue={cityInputvalue}
                areaValue={areaInputvalue}
                onChangeCity={(value) => handleInputChange("city", value)}
                onChangeArea={(value) => handleInputChange("area", value)}
              />

              <div className="flex items-center font-semibold mt-10">
                <span className="flex w-20 mr-5">地址</span>
                <input
                  className="border px-2 py-2 w-full"
                  type="text"
                  value={editedData?.addressStreet || ""}
                  onChange={(e) =>
                    handleInputChange("addressStreet", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center font-semibold   mt-10">
                <span className="flex w-auto py-3 mr-10">信用卡</span>
                <a href="" className=" my-3 text-red-500 cursor-pointer">
                  新增信用卡
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 bg-white w-full items-end justify-end ">
          <button
            onClick={handleSaveChanges}
            className="text-white  bg-red-400 px-5 rounded-sm  py-2  justify-end items-end"
          >
            儲存變更
          </button>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
