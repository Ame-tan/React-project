import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import OrderManagement from "./OrderManagement";
import TopAll from "../../layouts/Header";
import EndPage from "../../layouts/Footer";

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
      <div className="account-container">
        <div className="flex  w-full  mt-10  justify-center">
          <div className="flex   flex-col  w-full  space-y-2">
            <div className="flex  space-x-8  border-b  pb-4">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`text-xl px-5 ${
                    activeTab === index
                      ? "font-bold  text-red-400  shadow-lg    py-2  hover:opacity-75"
                      : "text-gray-600  font-bold  hover:opacity-75"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content  account-container  container  w-full  flex ">
              {activeTab === 0 ? (
                <div className="w-full max-w-full p-4  rounded-lg ">
                  <PersonalInformation />
                </div>
              ) : (
                <div className="flex w-full max-w-full text-center  rounded-lg ">
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
