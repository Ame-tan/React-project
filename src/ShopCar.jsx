import React, { useEffect, useState } from "react";
import TopAll from "./TopAll";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  loadCart,
  saveCartToFirestore,
  clearCart,
} from "./cartSlice";
import { auth } from "./firebase";
import { getProducts } from "./productSlice"; // 假設你有一個可以獲取產品的函數
import { getImages } from "./imageSlice"; // 引入圖片 slice
import { getFirstPhoto } from "./getFirstPhoto"; // 引入 getFirstPhoto 函數
import EndPage from "./EndPage";
import { handleUpdateQuantityWithPrice } from "./AddPriceToCart";
import { submitOrder } from "./orderSlice";

const ProductItem = ({ product, cartItem, onRemove, handleQuantityChange }) => {
  if (!product || !cartItem) {
    return <div>產品加載失敗</div>;
  }
  const { quantity = 1, size, color, goods, price } = cartItem;
  const subtotal = price * quantity;

  return (
    <div className="flex flex-col md:flex-row justify-between  items-center px-6 py-10 border-b">
      <Link to={`/products/${product.id}`} className="mb-4 md:mb-0">
        <img
          src={product.imagePath}
          alt={product.description}
          className="w-auto h-40 object-cover"
        />
      </Link>
      <div className="flex-col cursor-auto w-44 items-center justify-center pt-2">
        <div className="flex w-50">{product.description}</div>
        {/* category 不是 "飾品" 才顯示尺寸資訊 */}
        {product.category !== "飾品" && <div>尺寸： {size}</div>}
        {/* 只有id:"12"需要顯示顏色資訊 */}
        {product.id === "12" && <div>顏色： {color}</div>}
        <div className="font-bold">{goods}</div>
      </div>
      <div className="flex pr-4">NT${price ? price.toLocaleString() : "0"}</div>

      <div className="flex items-center">
        <button
          className="border rounded-md px-2 py-2 bg-gray-200 hover:bg-gray-300 "
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

        <span className="border rounded-md p-2 w-16 text-center mx-2">
          {quantity}
        </span>

        <button
          className="border rounded-md px-2 py-2 bg-gray-200 hover:bg-gray-300 "
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

      <div className="flex m-2">NT${subtotal.toLocaleString()}</div>
      <button
        onClick={() => onRemove(product.id, size, color, goods)}
        className="flex m-14"
      >
        刪除
      </button>
    </div>
  );
};

function ShopCar() {
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
      navigate("/MyAccount/?tab=orders"); // 假設 "/order-management" 是訂單管理頁面路徑
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
      <div className="relative z-0 bg-white w-full min-h-screen p-4 md:p-11 flex flex-col items-center">
        <div className="w-full h-32 flex justify-center items-center text-amber-950 text-xl">
          <ProgressBar currentStep={currentStep} />
        </div>
        <div className="flex w-full mt-10 justify-center">
          <div className="flex flex-col w-full lg:md:w-2/3 space-y-10">
            {currentStep === 1 && (
              <>
                <div className="flex flex-col lg:justify-center lg:h-20 h-24   border bg-red-50 rounded lg:p-4">
                  <h1 className="lg:flex items-center text-lg">
                    已經是會員？登入後可以更方便管理訂單！
                    <Link
                      to="/Register"
                      className="ml-auto mr-5 px-4 py-2 bg-black text-white rounded font-bold"
                    >
                      加入會員
                    </Link>
                  </h1>
                </div>

                <div className="flex flex-col h-auto w-full justify-between border bg-gray-50 rounded p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center py-2 px-16 border-b ">
                    <span className="flex w-full md:w-auto text-center">
                      商品圖片
                    </span>
                    <span className="flex w-full md:w-auto text-center">
                      商品名稱&尺寸
                    </span>
                    <span className="flex w-full md:w-auto text-center">
                      單價
                    </span>
                    <span className="flex w-full md:w-auto text-center">
                      數量
                    </span>
                    <span className="flex w-full md:w-auto text-center">
                      小計
                    </span>
                    <span className="flex w-full md:w-auto text-center">
                      刪除按鈕
                    </span>
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
                    <div className="flex flex-grow justify-center items-center py-10">
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
                  <div className="flex flex-col h-auto w-full justify-between border bg-white rounded p-10">
                    <div className="flex flex-row justify-between items-center py-2 px-4 border-b">
                      <span className="flex w-full md:w-auto text-center">
                        商品資訊
                      </span>
                      <span className="flex w-full md:w-auto text-center pl-32">
                        單價
                      </span>
                      <span className="flex w-full md:w-auto text-center pr-12">
                        數量
                      </span>
                      <span className="flex w-full md:w-auto text-center">
                        小計
                      </span>
                    </div>

                    {/* 顯示購物車中的每項商品 */}
                    {cartItems.map((cartItem) => {
                      const product = products.find(
                        (product) => product.id === cartItem.productId
                      );

                      if (!product) return null;

                      const subtotal = cartItem.price * cartItem.quantity; // 計算小計

                      return (
                        <div
                          key={`${cartItem.productId}-${cartItem.size || []}-${
                            cartItem.goods || []
                          }-${cartItem.color || []}`}
                          className="flex flex-row justify-between items-center py-2 px-4 border-b"
                        >
                          <div className="w-full text-start">
                            {product.description}
                            {product.category !== "飾品" && cartItem.size
                              ? ` (${cartItem.size}-${cartItem.goods})`
                              : `(${cartItem.goods})`}
                            {product.id === "12" && (
                              <div>-{cartItem.color}-</div>
                            )}
                          </div>
                          <div className="w-7/12 text-center">
                            NT$
                            {cartItem.price.toLocaleString()}
                          </div>
                          <div className="w-11/12 text-center">
                            {cartItem.quantity}
                          </div>
                          <div className="w-6/12 text-right">
                            NT${subtotal.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
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
