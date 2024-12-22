import React,{ useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword , signOut } from "firebase/auth";
import TopAll from "./TopAll";
import EndPage from "./EndPage";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      return setErrorMessage("密碼必須一致");
    }

    // 註冊用戶
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccessMessage("註冊成功！即將跳轉至登入頁面，請稍候...");
        signOut(auth) // 註冊成功後先登出用戶避免直接登入
          .then(() => {
            setTimeout(() => {
              navigate("/Login"); // 註冊成功後跳轉至登入頁面
            }, 2000);
          })
          .catch((error) => {
            setErrorMessage(`登出失敗: ${error.message}`);
          });
      })
      
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("此信箱已存在");
        }
          else if (error.code === "auth/weak-password") {
          setErrorMessage("密碼強度不足 ( 最少由6個字數組成 )");
        } else {
          setErrorMessage(`註冊失敗: ${error.message}`);
        }
      });
  };

  return (
    <>
      <TopAll />
      <div className="login-member-container">
        <div className="container  max-w-md  p-5">
          <div className="border  border-gray-300  rounded-lg  bg-white  p-8  shadow-md">

            <h2 className="text-center  text-2xl  font-bold   text-gray-900  sm:text-3xl">
              註冊
            </h2>

              <form onSubmit={handleSubmit} className="mt-8  space-y-8">

                  <div>
                    <label
                      htmlFor="email"
                      className="block  text-sm  font-medium  text-gray-700"
                    >
                    信箱
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border border-gray-300  px-3  py-2
                                  sm:text-sm  text-gray-900  shadow-md focus:bg-blue-50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block  text-sm  font-medium  text-gray-700"
                  >
                    密碼
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password || ""}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block  w-full  rounded-md  border  border-gray-300  px-3  py-2
                                  sm:text-sm text-gray-900  shadow-md  focus:bg-blue-50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block  text-sm  font-medium  text-gray-700"
                  >
                    確認密碼
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword || ""}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="block  w-full  rounded-md  border  border-gray-300  px-3  py-2  
                                  sm:text-sm  text-gray-900  shadow-md  focus:bg-blue-50"
                    />
                  </div>
                </div>


                  <button
                    type="submit"
                    className="flex  w-full  justify-center  rounded-md  bg-red-500  px-4  py-2
                              text-white  font-semibold  text-lg  shadow-lg  hover:bg-red-400"
                  >
                    註冊
                  </button>

                  {errorMessage && (
                    <div className="text-sm  text-red-500">{errorMessage}</div>
                  )}
                  {successMessage && (
                    <div className="text-sm  text-red-500">{successMessage}</div>
                  )}
              </form>

                <p className="mt-6  text-center  text-base  text-gray-600">
                  已有帳號？
                  <Link
                    to="/Login"
                    className="font-semibold  text-red-500  hover:text-red-700  hover:underline"
                  >
                    前往登入
                  </Link>
                </p>

    </div>
  </div>
</div>

      <EndPage/>
    </>
  );
}
export default Register;
