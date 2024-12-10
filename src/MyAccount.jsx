import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import OrderManagement from "./OrderManagement";
import TopAll from "./TopAll";
import EndPage from "./EndPage";

function MyAccount() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab"); // 獲取 URL 中的 tab
  const [activeTab, setActiveTab] = useState(tabParam === "orders" ? 1 : 0);

  const tabs = ["個人資訊", "訂單管理"];

  const handleTabClick = (index) => {
    setActiveTab(index);
    setSearchParams({ tab: index === 0 ? "info" : "orders" });
  };

  return (
    <>
      <TopAll />
      <div className="relative z-0 bg-white w-full min-h-screen p-4 md:p-11 flex flex-col items-center">
        <div className="flex w-full mt-10 justify-center">
          <div className="flex flex-col w-full md:w-2/3 space-y-10">
            <div className="flex space-x-8 border-b pb-4">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`text-xl ${
                    activeTab === index ? "font-bold" : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content w-full flex ">
              {activeTab === 0 ? (
                <div className="w-full max-w-full p-4  rounded-lg ">
                  <PersonalInformation />
                </div>
              ) : (
                <div className="w-full max-w-full  rounded-lg ">
                  <OrderManagement />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default MyAccount;
