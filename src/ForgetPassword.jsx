import React from "react";
import TopAll from "./TopAll";
import { useState } from "react";
import EndPage from "./EndPage";

function ForgetPassword() {
  const [forgetPassword, setForgetPassword] = useState("");

  const handleForgetPassword = (e) => {
    e.preventDefault();

    // 檢查輸入框是否為空
    if (!forgetPassword) {
      alert("必須輸入電子郵件!");
      return; // 阻止表單提交
    }

    // 彈出提示
    alert("重設密碼成功，請至信箱存取新密碼並前往至我的帳戶進行修改。");

    // 清空輸入框內容
    setForgetPassword("");
  };

  return (
    <>
      <TopAll />
      <div className="flex flex-col min-h-screen h-96"> {/* 確保最外層占滿頁面高度 */}
        <div className="flex justify-center px-6 py-10 mt-40">
          <h1 className="font-extrabold text-3xl items-center justify-center">
            忘記密碼？
          </h1>
        </div>

        <div className="p-5 sm:mx-auto sm:w-full sm:max-w-sm flex-grow">
          <form onSubmit={handleForgetPassword}>
            <div className="flex items-center border-b border-gray-600 py-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 mr-2 text-gray-800"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              <input
                id="forgetpassword"
                name="forgetpassword"
                type="email"
                onChange={(e) => setForgetPassword(e.target.value)} // 即時更新輸入框內容
                value={forgetPassword}
                autoComplete="current-fp"
                placeholder="輸入電子郵件"
                className="block w-full pl-1 focus:outline-none py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-lg sm:leading-6"
              />
            </div>

            <button
              type="submit"
              className="p-5 mt-5 text-white bg-red-500 hover:bg-red-400 border w-full h-auto items-center justify-center"
            >
              重設密碼
            </button>
          </form>
        </div>

        <div className="mt-auto"> {/* 確保 EndPage 在最底部 */}
          <EndPage />
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
