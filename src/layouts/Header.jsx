import { useState, useEffect, useContext } from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  ChatIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import icon from "../assets/ICON.png";
import NavColumn from "../components/Common-components/NavColumn";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import AuthContext from "../components/Auth/AuthContext";

function Header() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // 使用 useSelector 從 Redux 中獲取 cartItems
  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = async (location, navigate) => {
    const user = auth.currentUser; // 獲取當前用戶

    if (user) {
      try {
        // 儲存購物車到 Firestore
        await saveCartToFirestore(user.uid, cartItems);
        setUser(auth.currentUser);
      } catch (error) {
        console.error("儲存購物車失敗：", error);
      }
    }

    try {
      await auth.signOut();
      dispatch(clearCart()); // 清空購物車

      // 若當前頁面不是首頁，登出後導向首頁
      if (location.pathname !== "/") {
        navigate("/");
      }
    } catch (error) {
      console.error("登出失敗：", error);
    }
  };

  // 用於將購物車資料儲存到 Firestore 的新函數
  const saveCartToFirestore = async (userId, cartItems) => {
    await setDoc(doc(db, "carts", userId), {
      items: cartItems,
      updatedAt: new Date(),
    });
  };

  // 新增：用於清空購物車的 useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch(clearCart([])); // 用戶登出時清空購物車
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  // 表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("提交成功");
    setIsOpen(false); // 提交後關閉
  };

  // 點擊背景遮罩部分來關閉
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  // 阻止點擊事件從表單傳遞到背景遮罩
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="top-container">
        <Link to="/">
          <img
            src={icon}
            className="container  h-20  md:block  hidden"
            alt="Logo"
          />
        </Link>
        <div className="container   h-4  md:border-b  border-gray-300   md:block  hidden"></div>

        <NavColumn />

        <div className="sticky  top-0 left-0 w-full bg-red-50 z-50 py-2 px-1 md:hidden">
          <NavColumn />
          <div className="icon-container">
            <div className="content">
              <Link to="/" className="logo">
                <img src={icon} className="h-12 w-auto " alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="actions">
            {!auth.currentUser ? (
              <Link to="/Login">
                <div className="px-4 min-w-12 h-10 text-sm border-gray-400 border rounded-md text-gray-800 flex items-center space-x-2">
                  <UserIcon className="w-4 h-4 text-gray-800" />
                  <span className="hidden xl:block">登入會員</span>
                </div>
              </Link>
            ) : (
              <>
                <Link to="/">
                  <div
                    onClick={() => handleLogout(location, navigate)}
                    className="px-4 min-w-12 h-10 text-sm border-gray-400 border rounded-md text-gray-800 flex items-center space-x-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-gray-800"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="hidden xl:block">登出</span>
                  </div>
                </Link>

                <Link to="/MyAccount">
                  <div className="px-4 min-w-12 h-10 text-sm border-gray-400 border rounded-md text-gray-800 flex items-center space-x-2">
                    <UserCircleIcon className="w-4 h-4 text-gray-800" />
                    <span className="hidden xl:block">我的帳戶</span>
                  </div>
                </Link>
              </>
            )}

            {/* 購物車 */}
            <Link to="/ShopCar">
              <div className="px-4 min-w-12 h-10 text-sm border-gray-400 border rounded-md text-gray-800 flex items-center space-x-2">
                <ShoppingCartIcon className="w-4 h-4 text-gray-800" />
                <span className="hidden xl:block">購物車</span>
              </div>
            </Link>

            {/* 聯絡我們 */}
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 min-w-12 h-10 text-sm border-gray-400 border rounded-md text-gray-800 flex items-center space-x-2"
            >
              <ChatIcon className="w-4 h-4 text-gray-800" />
              <span className="hidden xl:block">聯絡我們</span>
            </button>
          </div>
        </div>

        <div className="absolute container py-2  w-auto right-0  flex z-40 items-center space-x-2 px-2 justify-end">
          {!auth.currentUser ? (
            <Link to="/Login">
              <div
                className="md:px-4   container min-w-12  h-10  text-sm  md:text-base  md:border-gray-400  md:border  md:rounded-md
                              md:text-gray-800    md:flex  md:items-center  md:space-x-2 hidden "
              >
                <UserIcon className="w-4  h-4  md:w-5  md:h-5  text-gray-800" />
                <span className="xl:block hidden">登入會員</span>
              </div>
            </Link>
          ) : (
            <>
              <Link to="/">
                <div
                  onClick={() => handleLogout(location, navigate)}
                  className="md:px-4 min-w-12  h-10  text-sm  md:text-base  md:border-gray-400  md:border  md:rounded-md
                              md:text-gray-800    md:flex  md:items-center  md:space-x-2 hidden  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4  h-4  md:w-5  md:h-5 text-gray-800 md:block hidden"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="xl:block hidden">登出</span>
                </div>
              </Link>

              <Link to="/MyAccount">
                <div
                  className="px-4   min-w-12  h-10 text-sm  md:text-base  border-gray-400  border  rounded-md
                              text-gray-800  p-2  flex  items-center  space-x-2"
                >
                  <UserCircleIcon className="w-4  h-4  md:w-5  md:h-5  text-gray-800" />
                  <span className="xl:block hidden">我的帳戶</span>
                </div>
              </Link>
            </>
          )}

          <Link to="/ShopCar">
            <div
              className="px-4  min-w-12  h-10 text-sm  md:text-base  border-gray-400  border  rounded-md
                              text-gray-800  p-2  flex  items-center  space-x-2"
            >
              <ShoppingCartIcon className="w-4  h-4  md:w-5  md:h-5  text-gray-800" />
              <span className="xl:block hidden">購物車</span>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 min-w-12  h-10 text-sm  md:text-base  border-gray-400  border  rounded-md
                              text-gray-800  p-2  flex  items-center  space-x-2"
          >
            <ChatIcon className="w-4  h-4  md:w-5  md:h-5  text-gray-800" />
            <span className="xl:block hidden">聯絡我們</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed  inset-0  bg-gray-800  bg-opacity-70  flex  items-center  justify-center z-50"
        >
          <div
            onClick={handleFormClick}
            className="bg-white  p-6  rounded-lg  xl:w-1/3 w-3/4  shadow-lg"
          >
            <h2 className="text-lg md:text-xl font-bold mb-4">聯絡我們</h2>
            <p className="text-sm md:text-base mb-4">
              謝謝您的主動聯絡，請留下要諮詢的問題，我們會用以下資訊進行回覆。
            </p>
            <form onSubmit={handleSubmit}>
              {auth.currentUser ? (
                <div className="mb-4">
                  <label className="block mb-2 mt-4 text-sm md:text-base">
                    電子信箱：{auth.currentUser.email}
                  </label>
                  <textarea
                    id="description"
                    className="resize-none w-full px-2 py-2 h-36 border rounded-md "
                    placeholder="輸入你的訊息"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="w-full border rounded-md  p-2"
                      placeholder="輸入你的信箱"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      className="resize-none w-full h-36 border rounded-md px-2 py-2"
                      placeholder="輸入你的訊息"
                    />
                  </div>
                </>
              )}
              <div className="text-end">
                <button
                  type="submit"
                  className="bg-red-500 text-white text-sm md:text-base px-6 py-2 rounded-md shadow-md hover:bg-red-700"
                >
                  送出
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
