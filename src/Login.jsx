import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuthToken } from "./utils";
import AuthContext from "./contexts";
import { auth } from "./firebase";
import { setCartItems } from "./cartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import TopAll from "./TopAll";
import EndPage from "./EndPage";

// 載入購物車
const loadCartFromFirebase = async (uid) => {
  const cartDoc = doc(db, "carts", uid);
  const cartSnapshot = await getDoc(cartDoc);

  if (cartSnapshot.exists()) {
    return cartSnapshot.data().items || []; // 回傳購物車 items，如果為空則返回空陣列
  }
  return [];
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // 使用 Firebase 提供的登入方法
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 登入成功，獲取用戶資料
      const user = userCredential.user;

      // 獲取 token
      const token = await user.getIdToken();

      // 保存 token
      setAuthToken(token);

      // 用戶資料
      setUser({
        id: user.uid,
        email: user.email,
      });

      // 將用戶資料存入 localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.uid,
          email: user.email,
        })
      );

      // 加載購物車
      const cartItems = await loadCartFromFirebase(user.uid);
      dispatch(setCartItems(cartItems)); // 更新 Redux 購物車狀態
      navigate("/");
    } catch (error) {
      console.error(error.code, error.message); // 確認真正的錯誤代碼
      if (error.code === "auth/user-not-found") {
        setErrorMessage("使用者不存在");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("密碼錯誤");
      } else {
        setErrorMessage("登入失敗，請檢查您的資訊");
      }
      
    }
  };

  return (
    <>
      <TopAll />
      <div className="flex  justify-center  items-center  mx-auto min-h-screen px-4  py-12 max-w-screen-sm sm:px-2  lg:px-8">
        <div className="w-full mx-auto  max-w-md">
          <div className="border mx-auto border-gray-300  rounded-lg  bg-white  p-8  shadow-md">
            <h2 className="text-center  text-2xl  font-bold  tracking-tight  text-gray-900  sm:text-3xl">
              登入
            </h2>

            <form onSubmit={handleSubmit} className="mt-8  space-y-6">
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
                    className="block  w-full  rounded-md  border  border-gray-300  px-3  py-2  
                                  sm:text-sm  text-gray-900  shadow-md  focus:bg-blue-50"
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
                                  sm:text-sm  text-gray-900  shadow-md  focus:bg-blue-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex  w-full  justify-center  rounded-md  bg-red-500  px-4  py-2
                              text-white  font-semibold  text-lg  shadow-lg  hover:bg-red-400"
              >
                登入
              </button>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </form>

            <p className="mt-6  text-center  text-base  text-gray-600">
              還不是會員？
              <Link
                to="/Register"
                className="font-semibold  text-red-500  hover:text-red-700  hover:underline"
              >
                前往註冊
              </Link>
            </p>
          </div>
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default Login;
