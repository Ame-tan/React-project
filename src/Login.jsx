import { useState, useContext  } from "react";
import React from "react";
import TopAll from "./TopAll";

import { login } from "./WebAPI";
import { setAuthToken } from "./utils";

import { useNavigate } from "react-router-dom";

import  AuthContext  from "./contexts";
import { getMe } from "./WebAPI";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  // 阻止送出表單
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      // 成功的話就把 token 存到 localStorage
      setAuthToken(data.token);
      getMe().then((response) => {
        if (data.ok !== 1) {
          // 在 getMe() 出錯代表還沒成功登入，因此要把 token 清空
          setAuthToken(null);
          setErrorMessage(response.toString());        
        }
        setUser(response.data);
        // 並導回首頁
        navigate("/");
      });
    });
  };

  const { setUser } = useContext(AuthContext);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <TopAll />
      <div className="flex justify-center px-6 py-24 ">
        <div className="border border-gray-300 rounded-lg p-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            登入
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  使用者名稱
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username || ""} // 確保有初始值
                    onChange={handleUsername}
                    required
                    className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    密碼
                  </label>
                  <div className="text-sm">
                    <a
                      href="ForgetPassword"
                      className="font-semibold text-red-500 hover:text-red-700 hover:underline"
                    >
                      忘記密碼？
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password || ""} // 確保有初始值
                    onChange={handlePassword}
                    required
                    autoComplete="current-password"
                    className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  登入
                </button>
              </div>
              {/* 顯示錯誤信息 */}
              {errorMessage && (
                <p className="mt-2 text-center text-red-500">
                  {"無效的使用者名稱或密碼"}
                </p>
              )}
            </form>

            <p className="mt-10 text-center text-lg text-gray-500 font-bold">
              還不是會員？{" "}
              <a
                href="Register"
                className="font-semibold leading-6 text-red-500 hover:text-red-700 hover:underline"
              >
                前往註冊
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
