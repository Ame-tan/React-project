import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

function AddressSelect({
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
  selectedArea,
  setSelectedArea,
  cityValue,
  areaValue,
  onChangeCity,
  onChangeArea,
}) {
  const [countries, setCountries] = useState([]);



  // 請求國家資料
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:4000/countries");
        console.log("國家資料：", response.data);
        setCountries(response.data || []);
      } catch (error) {
        console.error("獲取國家資料失敗：", error);
        alert("無法獲取國家資料，請稍後重試。");
      }
    };
    fetchCountries();
  }, []);


  const cities = useMemo(() => {
    console.log("選擇的國家:", selectedCountry);
    const countryData = countries.find(
      (country) => country.country === selectedCountry
    );
    console.log("城市資料:", countryData?.cities);
    return countryData ? countryData.cities : [];
  }, [countries, selectedCountry]);

  const areas = useMemo(() => {
    const cityData = cities.find((city) => city.city === selectedCity);
    console.log("地區資料:", cityData?.areas);
    return cityData ? cityData.areas : [];
  }, [cities, selectedCity]);

  return (
    <div>
      <div className="flex items-center font-semibold mt-10">
        <span className="flex w-20 mr-5">國家</span>
        <select
          className="border px-2 py-2 w-full"
          multiple={false}
          value={selectedCountry || ""} // 確保 value 是字串
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedCity("");
            setSelectedArea("");
          }}
        >
          <option disabled className="text-gray-400" value="">
            請選擇
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <>
          <div className="flex items-center font-semibold mt-10">
            <span className="flex w-20 mr-5">城市/縣</span>
            {selectedCountry === "台灣" ? (
              <select
                multiple={false}
                className="border px-2 py-2 w-full"
                value={selectedCity || ""}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedArea("");
                }}
              >
                <option disabled className="text-gray-400" value="">
                  請選擇
                </option>
                {cities.map((city, index) => (
                  <option key={index} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="border px-2 py-2 w-full"
                placeholder="請輸入城市"
                value={cityValue}
                onChange={(e) => onChangeCity(e.target.value)}
              />
            )}
          </div>

          <div className="flex items-center font-semibold mt-10">
            <span className="flex w-20 mr-5">地區</span>
            {selectedCountry === "台灣" ? (
              <select
                multiple={false}
                className="border px-2 py-2 w-full"
                value={selectedArea||""}
                onChange={(e) => setSelectedArea(e.target.value)}
                disabled={!selectedCity} // 當選擇城市之前，地區選項是禁用的
              >
                <option disabled className="text-gray-400" value="">
                  請選擇
                </option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="border px-2 py-2 w-full"
                placeholder="請輸入地區"
                value={areaValue}
                onChange={(e) => onChangeArea(e.target.value)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AddressSelect;
