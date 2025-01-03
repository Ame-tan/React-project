import React, { useEffect, useState } from "react";
import TopAll from "../../layouts/Header";
import { Link, useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import ProgressBar from "./ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  loadCart,
  saveCartToFirestore,
  clearCart,
} from "../../store/cartSlice";
import { auth } from "../../firebase/firebase";
import { getProducts } from "../../store/productSlice";
import { getImages } from "../../store/imageSlice";
import { getFirstPhoto } from "./getFirstPhoto"; // 獲取第一張圖片
import EndPage from "../../layouts/Footer";
import { handleUpdateQuantityWithPrice } from "../Common-components/AddPriceToCart";
import { submitOrder } from "../../store/orderSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

{
  /*currentStep 第一步驟的(購物車)*/
}
const ProductItem = ({ product, cartItem, onRemove, handleQuantityChange }) => {
  if (!product || !cartItem) {
    return <div>產品加載失敗</div>;
  }
  const { quantity = 1, size, color, goods, price } = cartItem;
  const subtotal = price * quantity;

  return (
    <div className="shopcar-product-information-container">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imagePath}
          alt={product.description}
          className="shopcar-img"
        />
      </Link>
      <div className="shopcar-product-information">
        <div>{product.description}</div>
        {/* category 不是 "飾品" 才顯示尺寸資訊 */}
        {product.category !== "飾品" && (
          <div className="pt-2">尺寸： {size}</div>
        )}
        {color.length > 0 && <div>顏色： {color}</div>}
        <div className=" font-bold pt-2 underline">{goods}</div>
      </div>
      <div className="shopcar-price">
        NT${price ? price.toLocaleString() : "0"}
      </div>

      <div className="shopcar-quantity-container">
        <button
          className="shopcar-quantity-button"
          onClick={() =>
            handleQuantityChange(
              cartItem.productId,
              Math.max(1, quantity - 1),
              size,
              color,
              goods,
              price
            )
          } // 減少數量，最小為1
        >
          -
        </button>

        <span className="shopcar-quantity-input">{quantity}</span>

        <button
          className="shopcar-quantity-button"
          onClick={() =>
            handleQuantityChange(
              cartItem.productId,
              quantity + 1,
              size,
              color,
              goods,
              price
            )
          } // 增加數量
        >
          +
        </button>
      </div>

      <div className="shopcar-subtotal">NT${subtotal.toLocaleString()}</div>

      <button
        className="shopcar-delete-button"
        onClick={() => onRemove(product.id, size, color, goods)}
      >
        <span className="lg:flex hidden">刪除</span>
        <XIcon className="lg:hidden" />
      </button>
    </div>
  );
};

{
  /*currentStep 第二步驟的(確認訂單)*/
}
const CheckProductItem = ({ product, cartItem }) => {
  if (!product || !cartItem) {
    return <div>產品加載失敗</div>;
  }
  const { quantity = 1, size, color, goods, price } = cartItem;
  const subtotal = price * quantity;

  return (
    <div className="shopcar-product-information-container">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imagePath}
          alt={product.description}
          className="shopcar-img"
        />
      </Link>
      <div className="shopcar-product-information">
        <div>{product.description}</div>
        {/* category 不是 "飾品" 才顯示尺寸資訊 */}
        {product.category !== "飾品" && (
          <div className="pt-2">尺寸： {size}</div>
        )}
        {color.length > 0 && <span>顏色：{color}</span>}
        <div className=" font-bold pt-2 underline">{goods}</div>
      </div>
      <div className="shopcar-price">
        NT${price ? price.toLocaleString() : "0"}
      </div>

      <div className="lg:flex  lg:relative  lg:w-12  lg:pt-0  pt-10 hidden">
        <span className="shopcar-quantity-input">{quantity}</span>
      </div>
      <div className="flex  relative  w-30 text-lg     pt-10 lg:hidden ">
        <span className="shopcar-quantity-input">數量：{quantity}</span>
      </div>

      <div className="lg:w-20  lg:pt-0  pt-5  lg:text-base  text-lg">
        NT${subtotal.toLocaleString()}
      </div>
    </div>
  );
};

function ShopCar() {
  // 登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [firstImages, setFirstImages] = useState({}); // 新增 state 來儲存每個商品的第一張圖片
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalCartPrice = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  // 計算總計
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const totalPrice = calculateTotalPrice(cartItems);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts(); // 獲取所有產品資料
      setProducts(productsData);
    };
    fetchProducts();
    dispatch(getImages()); // 獲取圖片資料
  }, [dispatch]);

  useEffect(() => {
    const fetchImagesForProducts = async () => {
      const images = {};
      for (const cartItem of cartItems) {
        const image = await getFirstPhoto(cartItem.productId); // 獲取每個商品的第一張圖片
        images[cartItem.productId] = image?.path || []; // 儲存圖片的 URL
      }
      setFirstImages(images); // 更新 state
    };
    fetchImagesForProducts();
  }, [cartItems]);
  console.log("Cart items:", cartItems);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // 載入用戶購物車
      dispatch(loadCart(user.uid));
    }
  }, [dispatch]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // 每次購物車變更時保存到 Firestore
      saveCartToFirestore(user.uid, cartItems);
    }
  }, [cartItems]);

  const handleRemoveFromCart = (productId, size, color, goods, price) => {
    dispatch(removeFromCart({ productId, size, color, goods, price }));
  };

  const handleQuantityChange = (
    productId,
    newQuantity,
    size,
    color,
    goods,
    price
  ) => {
    if (newQuantity < 1) return;
    dispatch(
      handleUpdateQuantityWithPrice({
        productId,
        quantity: newQuantity,
        size,
        color,
        goods,
        price,
      })
    );
  };
  const navigate = useNavigate();
  const handleCheckout = async () => {
    const result = await dispatch(submitOrder({ cartItems, totalCartPrice }));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(clearCart()); // 清空購物車
      alert("訂單提交成功！");
    } else {
      alert(result.payload || "訂單提交失敗！");
    }
    setCurrentStep(3);
    setTimeout(() => {
      navigate("/MyAccount/?tab=orders"); // 訂單管理頁面路徑
    }, 3000); // 3秒後跳轉
  };
  const handleToPay = async () => {
    if (cartItems.length === 0) {
      alert("購物車不得為空！");
      return;
    }
    nextStep();
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <TopAll />
      <div className="relative z-0 bg-white w-full container min-h-screen p-4 md:p-2 flex flex-col items-center">
        <div className="w-full container h-32 flex justify-center items-center text-amber-950 text-xl">
          <ProgressBar currentStep={currentStep} />
        </div>
        <div className="shopcar-container">
          <div className="flex container flex-col w-full space-y-10">
            {currentStep === 1 && (
              <>
                {!isLoggedIn && (
                  <div className="shopcar-loginmember-container">
                    <h1 className="shopcar-loginmember-text">
                      已經是會員？登入後可以更方便管理訂單！
                      <Link
                        to="/Register"
                        className="shopcar-loginmember-button"
                      >
                        加入會員
                      </Link>
                    </h1>
                  </div>
                )}

                <div className="shopcar-content-container">
                  <div className="shopcar-title-container">
                    <span className="flex  w-44">商品圖片</span>
                    <span className="flex  w-48">商品名稱&尺寸</span>
                    <span className="flex  w-28">單價</span>
                    <span className="flex  w-32">數量</span>
                    <span className="flex  w-14">小計</span>
                    <span className="flex  w-16">刪除按鈕</span>
                  </div>

                  {cartItems.length > 0 ? (
                    cartItems.map((cartItem) => {
                      const product = products.find(
                        (product) => product.id === cartItem.productId
                      );

                      const productImage = firstImages[cartItem.productId]; // 使用獲取到的第一張圖片

                      return (
                        <ProductItem
                          key={`${cartItem.productId}-${cartItem.size || []}-${
                            cartItem.color || []
                          }-${cartItem.goods || []}`}
                          product={{ ...product, imagePath: productImage }} // 使用第一張圖片的路徑
                          cartItem={cartItem}
                          onRemove={handleRemoveFromCart}
                          handleQuantityChange={handleQuantityChange}
                        />
                      );
                    })
                  ) : (
                    <div className="flex flex-grow  justify-center items-center py-10">
                      您的購物車是空的。
                    </div>
                  )}
                </div>

                <div className="text-right px-5 text-lg font-bold ">
                  <span className="border-b-2 border-black">
                    訂單總金額：NT${totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-end items-end ml-auto h-auto text-lg">
                  <Link
                    to="/"
                    className="ml-auto mr-5 px-5 py-2 bg-black text-white rounded-md "
                  >
                    繼續選購
                  </Link>
                  <button
                    onClick={handleToPay}
                    className="ml-auto mr-5 px-5 py-2 bg-black text-white rounded-md"
                  >
                    前往付款
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="flex flex-col justify-center h-auto border bg-gray-50 rounded p-10">
                  <h2 className="text-lg font-bold mb-4">訂單確認</h2>
                  <div className="shopcar-content-container">
                    <div className="shopcar-title-container">
                      <span className="flex w-52">商品圖片</span>
                      <span className="flex w-56">商品名稱&尺寸</span>
                      <span className="flex  w-28">單價</span>
                      <span className="flex  w-28">數量</span>
                      <span className="flex  w-8">小計</span>
                    </div>

                    {cartItems.length > 0 ? (
                      cartItems.map((cartItem) => {
                        const product = products.find(
                          (product) => product.id === cartItem.productId
                        );

                        const productImage = firstImages[cartItem.productId]; // 使用獲取到的第一張圖片

                        return (
                          <CheckProductItem
                            key={`${cartItem.productId}-${
                              cartItem.size || []
                            }-${cartItem.color || []}-${cartItem.goods || []}`}
                            product={{ ...product, imagePath: productImage }} // 使用第一張圖片的路徑
                            cartItem={cartItem}
                          />
                        );
                      })
                    ) : (
                      <div className="flex flex-grow justify-center items-center py-10">
                        您的訂單是空的。
                      </div>
                    )}
                  </div>
                  <div className="text-right px-5 text-lg font-bold mt-4">
                    <span className="border-b-2 border-black">
                      訂單合計：NT${totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-end items-end mt-6">
                    <button
                      onClick={handleCheckout}
                      className="ml-auto mr-5 px-5 py-2 bg-black text-white rounded"
                    >
                      確認並進行付款
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <div className="flex flex-col justify-center items-center h-auto border bg-gray-50 rounded p-10">
                <h2 className="text-lg font-bold mb-4">訂單已完成</h2>
                <p className="text-center text-gray-600 mb-6">
                  訂單已成功完成！正在跳轉到訂單管理頁面...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default ShopCar;
