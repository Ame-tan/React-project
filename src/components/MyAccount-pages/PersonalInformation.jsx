import { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import AuthContext from "../Auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import PhoneNumberInput from "./PersonalInformation-content/PhoneNumberInput";
import AddressSelect from "./PersonalInformation-content/AddressSelect";
import BirthdayDropdown from "./PersonalInformation-content/BirthdayDropdown";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { loadMemberData, setMemberData } from "../../store/memberSlice";

function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser } = useContext(AuthContext);

  const memberData = useSelector((state) => state.member.data);
  const [editedData, setEditedData] = useState(memberData || {});
  const isSaving = useSelector((state) => state.member.isSaving);
  const [isDataFetched] = useState(false);

  const [errors, setErrors] = useState({});

  // 檢查"必填"欄位的函數
  const validateFields = () => {
    const newErrors = {};

    // 必填欄位清單
    if (!selectedCountry) newErrors.country = "此欄位為必填";
    if (!selectedCity) newErrors.city = "此欄位為必填";
    if (!selectedArea) newErrors.area = "此欄位為必填";
    if (!phoneInputValue) newErrors.phoneNumber = "此欄位為必填";
    if (!receiverPhoneInputValue) newErrors.receiverPhone = "此欄位為必填";
    if (!editedData?.addressStreet) newErrors.addressStreet = "此欄位為必填";
    if (!editedData?.receiverName) newErrors.receiverName = "此欄位為必填";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 沒有錯誤則返回 true
  };

  const [errorMessage, setErrorMessage] = useState("");
  const countries = [
    { name: "台灣", code: "+886", abbr: "TW", regex: /^09\d{8}$/ },
    { name: "香港", code: "+852", abbr: "HK", regex: /^[5689]\d{7}$/ },
    { name: "澳門", code: "+853", abbr: "MO", regex: /^6\d{7}$/ },
    { name: "中國", code: "+86", abbr: "CN", regex: /^1[3-9]\d{9}$/ },
    // 可以根據需要添加更多國家及其驗證正則表達式
  ];
  // 驗證手機號碼通用函數
  const validatePhone = (phone, code, type) => {
    const country = countries.find((c) => c.code === code);
    if (!country) {
      setErrorMessage(`${type} 無效的國碼，請重新選擇`);
      return false;
    }
    if (!country.regex.test(phone)) {
      setErrorMessage(`${type} 手機號碼無效或未填寫，請重新確認`);
      return false;
    }
    setErrorMessage(""); // 清空錯誤訊息
    return true;
  };

  // 用於驗證會員手機號碼
  const validatePhoneNumber = (phone) => {
    return validatePhone(phone, memberSelectedCode, "會員");
  };

  // 用於驗證收件人手機號碼
  const validateReceiverPhone = (phone) => {
    return validatePhone(phone, receiverSelectedCode, "收件人");
  };

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

  // 年、月、日選項
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i); // 100 年選項
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12 月
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1-31 日
  // 國家、縣市、地區
  const [selectedCountry, setSelectedCountry] = useState(""); // 國家&&下拉式選單
  const [selectedCity, setSelectedCity] = useState(""); // 城市&&下拉式選單
  const [selectedArea, setSelectedArea] = useState(""); // 地區&&下拉式選單
  const [cityInputvalue, setCityInputValue] = useState(""); // 國家不為"台灣"時城市欄位的inputvalue狀態
  const [areaInputvalue, setAreaInputValue] = useState(""); // 國家不為"台灣"時地區欄位的inputvalue狀態
  const [phoneInputValue, setPhoneInputValue] = useState(""); // 手機號碼輸入框
  const [receiverPhoneInputValue, setReceiverPhoneInputValue] = useState(""); //收件人電話輸入框

  // 在應用啟動時將會員資料加載到 Redux，並優先從本地快取 (localStorage) 中獲取，避免每次都向 Firebase 發送請求。
  // 如果本地快取中有資料，則直接同步到 Redux；
  // 如果本地快取中沒有資料，則向 Firebase 請求資料，並將其儲存到 localStorage 以便後續使用。
  useEffect(() => {
    const cachedData = localStorage.getItem(`memberData_${user.uid}`);
    if (cachedData) {
      dispatch(loadMemberData(JSON.parse(cachedData))); // 如果有快取資料，從 localStorage 讀取
    } else if (user.uid) {
      dispatch(loadMemberData(user.uid)).then((data) => {
        localStorage.setItem(`memberData_${user.uid}`, JSON.stringify(data)); // 儲存到 localStorage
      });
    }
  }, [user, dispatch]);

  // 加載用戶的會員資料
  useEffect(() => {
    if (user?.uid) {
      dispatch(loadMemberData(user.uid));
    }
  }, [dispatch, user]);

  // 登出(清空AuthToken user cart 頁面跳轉回首頁)
  const handleLogout = async () => {
    try {
      await auth.signOut();
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

      setMemberSelectedCode(memberData.memberSelectedCode || "");
      setMemberCountryAbbr(memberData.countryAbbr || "");
      setPhoneInputValue(memberData.phoneNumber || "");

      setReceiverSelectedCode(memberData.receiverSelectedCode || "");
      setReceiverCountryAbbr(memberData.countryAbbr || "");
      setReceiverPhoneInputValue(memberData.receiverPhone || "");

      setSelectedYear(memberData.year || "");
      setSelectedMonth(memberData.month || "");
      setSelectedDay(memberData.day || "");

      setEditedData(memberData);
    }
  }, [user, memberData]);

  // 更新儲存的資料
  const handleSaveChanges = async () => {
    if (isSaving) {
      console.log("正在保存資料，請稍候...");
      return;
    }
    if (!validateFields()) {
      console.log("有未填寫的必填欄位！");
      return;
    }

    if (
      !validatePhoneNumber(phoneInputValue) ||
      !validateReceiverPhone(receiverPhoneInputValue)
    ) {
      alert("請檢查手機號碼格式");
      return;
    }
    // 檢查手機號碼國碼是否一致
    if (memberSelectedCode !== receiverSelectedCode) {
      alert("會員和收件人的國碼必須相同！");
      return;
    }
    // 檢查 user 是否已加載
    if (!user || !user.uid) {
      console.log("用戶尚未登入，無法儲存資料！");
      alert("用戶尚未登入，無法儲存資料！");
      return;
    }

    if (editedData) {
      try {
        const updatedData = {
          country: selectedCountry || "",
          city: selectedCity || "",
          area: selectedArea || "",
          year: selectedYear || "",
          month: selectedMonth || "",
          day: selectedDay || "",
          memberSelectedCode: memberSelectedCode || "",
          receiverSelectedCode: receiverSelectedCode || "",
          countryAbbr: (memberCountryAbbr && receiverCountryAbbr) || "",
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
        // 儲存至 localStorage
        localStorage.setItem(
          `memberData_${user.uid}`,
          JSON.stringify(updatedData)
        );
        dispatch(setMemberData(updatedData));
        setEditedData(updatedData); // 更新本地狀態以即時反映頁面
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
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (value.trim() !== "") delete updatedErrors[field];
      return updatedErrors;
    });

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
      setMemberSelectedCode(memberSelectedCode || "");
      setMemberCountryAbbr(memberCountryAbbr || "");
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
    if (field === "receiverPhone") {
      setReceiverPhoneInputValue(value || "");
      setReceiverSelectedCode(receiverSelectedCode || "");
      setReceiverCountryAbbr(receiverCountryAbbr || "");
      setErrors((prevErrors) => ({ ...prevErrors, receiverPhone: "" }));
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
      <div className="personal-info  flex  flex-col  justify-center  h-20  p-4  max-w-max">
        <h1 className="flex  text-lg  items-center w-full">
          {`你好${user?.email}`}
          <Link
            to="/"
            onClick={handleLogout}
            className="text-red-500  hover:underline  w-full  cursor-pointer text-end text-lg"
          >
            登出
          </Link>
        </h1>
      </div>
      <div className="p-4  bg-white  rounded  shadow-md  w-full">
        <div className="flex  lg:flex-row  flex-col  lg:space-x-5">
          <div className="border  lg:p-5  lg:w-1/2  lg:h-auto  p-5">
            <h2 className="text-xl  font-bold">會員資料</h2>

            <div className="mb-2">
              <div className="account-info-container">
                <span className="account-title-text">電子郵件</span>
                <span className="border px-2 py-2 w-full">{user.email}</span>
              </div>

              <div className="account-info-container">
                <span className="account-title-text">手機號碼</span>
                <PhoneNumberInput
                  selectedCode={memberSelectedCode}
                  setSelectedCode={(value) => setMemberSelectedCode(value)}
                  countryAbbr={memberCountryAbbr}
                  setCountryAbbr={(value) => setMemberCountryAbbr(value)}
                  value={phoneInputValue}
                  onChange={(value) => handleInputChange("phoneNumber", value)}
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="account-info-container">
                <span className="account-title-text">生日日期(選填)</span>
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

              <div className="account-info-container">
                <span className="account-title-text">
                  備註
                  <div className="lg:after:block  hidden">
                    <br />
                  </div>
                  (選填)
                </span>
                <input
                  className="border px-2 py-2 w-full"
                  type="text"
                  value={editedData?.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="border lg:p-5 lg:w-1/2 lg:h-auto p-5">
            <h2 className="text-xl font-bold">配送與付款資訊</h2>
            <div className="mb-2">
              <div className="account-info-container">
                <span className="account-title-text">收件人</span>
                <input
                  className={`border px-2 py-2 w-full ${
                    errors.receiverName ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  value={editedData?.receiverName || ""}
                  onChange={(e) =>
                    handleInputChange("receiverName", e.target.value)
                  }
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverName}
                  </p>
                )}
              </div>

              <div className="account-info-container">
                <span className="account-title-text">
                  收件人
                  <div className="lg:after:block  hidden">
                    <br />
                  </div>
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
                {errors?.receiverPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverPhone}
                  </p>
                )}
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
                errors={errors}
              />

              <div className="account-info-container">
                <span className="account-title-text">地址</span>
                <input
                  className={`border px-2 py-2 w-full ${
                    errors.addressStreet ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  value={editedData?.addressStreet || ""}
                  onChange={(e) =>
                    handleInputChange("addressStreet", e.target.value)
                  }
                />
                {errors.addressStreet && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.addressStreet}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-4 bg-white w-full items-end justify-end ">
          <button
            onClick={handleSaveChanges}
            className="text-white  bg-red-400 px-5 rounded-sm  w-full py-2 hover:bg-red-300 "
          >
            儲存變更
          </button>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
