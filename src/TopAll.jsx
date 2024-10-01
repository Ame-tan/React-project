import React, { useContext, useState } from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  ChatIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import icon from "./ICON.png";
import NavColumn from "./NavColumn";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./contexts"; // 確保正確導入 AuthContext
import { setAuthToken } from "./utils"; // 確保正確導入 setAuthToken

function TopAll() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("提交成功");
    setIsOpen(false); // 提交後關閉模態框
  };
  // 點擊背景遮罩部分來關閉
  const handleOverlayClick = () => {
    setIsOpen(false);
  };
  // 阻止點擊事件從表單傳遞到背景遮罩(沒有設定就會變成點表單部分也會關閉)
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="TOP-Container    bg-red-50  w-full  h-40  p-4  flex  flex-col  justify-between">
      <div className="TOP-1   flex  space-x-4   justify-end">
        <div className="flex-grow  flex  justify-center  pl-96">
          <button className="focus:outline-none">
            <a href="/">
              <img src={icon} className="h-16  w-auto  pb-2 " />
            </a>
          </button>
        </div>  

        {!user ? (
          <a href="Login">
            <div className="Login text-xl border-gray-400 border-2 rounded-md text-gray-800 p-2 flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-gray-800" />
              <span>登入會員</span>
            </div>
          </a>
        ) : (
          <>
            <a href="Logout">
              <div
                onClick={handleLogout}
                className="Logout text-xl border-gray-400 border-2 rounded-md text-gray-800 p-2 flex items-center space-x-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>登出</span>
              </div>
            </a>
            <a href="/MyAccount">
              <div className="Logout text-xl border-gray-400 border-2 rounded-md text-gray-800 p-2 flex items-center space-x-2 cursor-pointer">
                <UserCircleIcon className="w-5 h-5 text-gray-800" />
                <span>我的帳戶</span>
              </div>
            </a>
          </>
        )}

        <a href="#!">
          <div className="Shop   text-xl   border-gray-400  border-2  rounded-md  text-gray-800  p-2  flex  items-center  space-x-2">
            <ShoppingCartIcon className="w-5  h-5  text-gray-800" />
            <span>購物車</span>
          </div>
        </a>

        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="Contact   text-xl  border-gray-400  border-2  rounded-md  text-gray-800  p-2  flex  items-center  space-x-2"
          >
            <ChatIcon className="w-5  h-5  text-gray-800" />
            <span>聯絡我們</span>
          </button>
        </div>
      </div>
      {/* 彈出表格 */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50"
        >
          <div
            onClick={handleFormClick}
            className="bg-white p-6 rounded-lg w-1/3 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">聯絡我們</h2>
            <p>
              謝謝您的主動聯絡，請留下要諮詢的問題，我們會用以下資訊進行回覆。
            </p>
            <form onSubmit={handleSubmit}>
              {user ? (
              <div className="mb-4">
                <label className="block  mb-2 mt-4" htmlFor="name">
                  您的電郵：user01@gmail.com
                </label>
              </div>) : (
              <div className="mb-4">
              <label className="block  mb-2 mt-4" htmlFor="name">
                您的聯絡方式：
              </label>
              <input
                    className="w-full px-2 pt-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent transition duration-150 ease-in-out"
                    type="email"
                    id="email"
                    placeholder="請輸入您的聯絡方式（如：信箱）"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <textarea
                  className="w-full h-40 px-2 pt-2  border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200
                  focus:border-transparent  transition  duration-150 ease-in-out "
                  type="text"
                  id="text"
                  placeholder="請輸入您的訊息。詢問商品時請留下商品名稱，也歡迎您留下電子信箱以外的聯絡方式，謝謝！"
                  required
                />
              </div>

              <div className="flex justify-end ">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded-md"
                >
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-center my-3">
        <div className="border-b border-gray-200 w-1/2" />
      </div>
      <NavColumn />
    </div>
  );
}

export default TopAll;
