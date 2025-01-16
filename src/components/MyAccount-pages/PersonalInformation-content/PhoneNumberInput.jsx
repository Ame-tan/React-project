import { useState } from "react";

const PhoneNumberInput = ({
  selectedCode,
  setSelectedCode,
  setCountryAbbr,
  value,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const countries = [
    { name: "台灣", code: "+886", abbr: "TW", regex: /^09\d{8}$/ },
    { name: "香港", code: "+852", abbr: "HK", regex: /^[5689]\d{7}$/ },
    { name: "澳門", code: "+853", abbr: "MO", regex: /^6\d{7}$/ },
    { name: "中國", code: "+86", abbr: "CN", regex: /^1[3-9]\d{9}$/ },
    // 可以根據需要添加更多國家及其驗證正則表達式
  ];

  const validatePhoneNumber = (phone, code) => {
    const country = countries.find((c) => c.code === code);
    if (!country) {
      setErrorMessage(`無效的國碼，請重新選擇`);
      return false;
    }
    if (!country.regex.test(phone)) {
      setErrorMessage(`手機號碼無效或未填寫，請重新確認`);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleCodeChange = (newCode) => {
    const selectedCountry = countries.find(
      (country) => country.code === newCode
    );
    setSelectedCode(selectedCountry?.code || ""); // 更新code
    setCountryAbbr(selectedCountry?.abbr || ""); // 更新abbr

    if (selectedCountry) {
      setErrorMessage("");
    } else {
      setErrorMessage("無效的國碼，請重新選擇");
    }
  };

  const handleInputChange = (phone) => {
    const numericPhone = phone.replace(/\D/g, "");
    onChange(numericPhone);

    // 清除錯誤訊息(如果輸入框為空)
    if (numericPhone === "") {
      setErrorMessage("");
      return;
    }

    // 即時驗證輸入的電話號碼
    validatePhoneNumber(numericPhone, selectedCode);
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex items-center border w-full h-10">
        <select
          className="relative mr-2 border-none w-auto "
          value={selectedCode}
          onChange={(e) => handleCodeChange(e.target.value)}
        >
          <option disabled value="">
            請選擇
          </option>
          {countries.map((country) => (
            <option key={country.abbr} value={country.code}>
              {country.name}
              {country.code} ({country.abbr})
            </option>
          ))}
        </select>

        {/* 電話號碼輸入框 */}
        <input
          type="tel"
          className="relative pl-1  w-full h-full"
          placeholder="請輸入電話號碼"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      {/* 錯誤訊息 */}
      {errorMessage && <p className="text-red-500 text-xs ">{errorMessage}</p>}
    </div>
  );
};

export default PhoneNumberInput;
