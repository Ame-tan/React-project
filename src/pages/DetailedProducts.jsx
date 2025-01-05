import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import $ from "jquery";
import TopAll from "../layouts/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
import AuthContext from "../components/Auth/AuthContext";
import AddToCartAlert from "../components/Common-components/AddToCartAlert";
import { useSelector } from "react-redux";
import EndPage from "../layouts/Footer";
import { money } from "../utils/formatMoney";
import { handleAddToCartWithPrice } from "../components/Common-components/AddPriceToCart";

function DetailedProducts() {
  const { id } = useParams(); // 獲取當前商品的ID
  const [data, setData] = useState({}); // 初始化 data 為空
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState([]);
  const [openSize, setOpenSize] = useState(false);
  const sizeOptions = ["S", "M", "L"];
  const [color, setColor] = useState([]);
  const [openColor, setOpenColor] = useState(false);
  const [goods, setGoods] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.items);
  const Money = money(data.money);

  const dispatch = useDispatch();

  // 當前顯示的主圖片索引
  const [nowImage, setNowImage] = useState(0);

  const handleAddToCartAlert = () => {
    if (data.category === "飾品") {
      // 如果是飾品，不需要檢查尺寸
      if (!goods.length) {
        setAlertMessage("請選擇現購或預購！");
      } else {
        addToCartItem();
      }
    } else {
      if (!size.length) {
        setAlertMessage("請選擇尺寸！");
      } else if (data.color && data.color.length > 0 && !color.length) {
        setAlertMessage("請選擇顏色！");
      } else if (!goods.length) {
        // 確保 goods 被選擇
        setAlertMessage("請選擇現購或預購！");
      } else {
        addToCartItem();
      }
    }
    setShowAlert(true);
  };

  const addToCartItem = () => {
    if (user) {
      const product = {
        id: data.id,
        color: color || [],
        goods: goods || [],
        size: size || [],
        quantity: quantity,
      };

      // 檢查購物車中是否已存在相同商品
      const existingItem = cartItems.find(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.color) === JSON.stringify(product.color) &&
          JSON.stringify(item.goods) === JSON.stringify(product.goods) &&
          JSON.stringify(item.size) === JSON.stringify(product.size)
      );

      if (existingItem) {
        // 更新現有商品的數量
        const newQuantity = existingItem.quantity + quantity;
        dispatch(
          handleAddToCartWithPrice({
            productId: product.id,
            quantity: newQuantity,
            size: product.size,
            color: product.color,
            goods: product.goods,
          })
        );
        setAlertMessage("商品數量已更新！");
      } else {
        // 如果商品不存在，則添加新商品
        dispatch(
          handleAddToCartWithPrice({
            productId: product.id,
            quantity: quantity,
            size: product.size || [],
            color: product.color || [],
            goods: product.goods || [],
          })
        );
        setAlertMessage("加入成功！");
      }
    } else {
      setAlertMessage("請先登入！");
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleSelectSize = (val) => {
    setSize(val);
    setOpenSize(false);
  };

  const handleSelectColor = (val) => {
    setColor(val);
    setOpenColor(false);
  };

  const handleSelectGoods = (val) => {
    setGoods(val);
  };

  useEffect(() => {
    $.ajax({
      url: `http://localhost:4000/products/${id}?_embed=images`,
      method: "GET",
      success: function (response) {
        console.log(response);
        setData(response);
        setLoading(false);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        setError(`Error: ${textStatus}`);
        setLoading(false); // 即使出錯也要關閉加載狀態
      },
    });
  }, [id]); // 僅在組件加載時執行一次

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const images = data.images || [];

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopAll />
      <div className="detailed-product-container">
        <div className=" lg:flex w-auto h-full lg:items-start items-center justify-center">
          {/* 主圖區 */}
          <div className="flex-col  container lg:flex lg:w-96 lg:h-full w-full px-2">
            {images[nowImage] && (
              <img
                key={images[nowImage].id}
                className=" lg:flex lg:w-96 lg:h-96 h-auto w-auto lg:object-cover"
                src={images[nowImage].path}
                alt={`Product Image ${images[nowImage].id}`}
              />
            )}
            {/* 縮圖區 */}
            <div className="thumbnails-container">
              {images.slice(0, 3).map((image, changeTouch) => (
                <img
                  key={image.id}
                  className={`thumbnail border ${
                    nowImage === changeTouch ? "border-blue-500" : ""
                  }`}
                  src={image.path}
                  alt={`Thumbnail ${image.id}`}
                  onClick={() => setNowImage(changeTouch)} // 點擊更新大圖
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:justify-start lg:px-0 px-5 lg:py-0 py-5 lg:ml-10 lg:w-96 w-full lg:h-60 mb-2 h-auto ">
            <h1 className="lg:h-96 h-auto font-semibold text-3xl leading-10  flex-wrap ">
              {data.description}
            </h1>
            <p className="flex mt-2 font-bold text-2xl">NT${Money}</p>

            {/* 尺寸選擇區，只在category不為"飾品"時顯示 */}
            {data.category !== "飾品" && (
              <div className="relative w-full mt-10 mb-5">
                <div
                  className="cursor-pointer w-full text-xl text-gray-800 p-2 bg-white border border-gray-300 rounded-md flex justify-between items-center"
                  onClick={() => setOpenSize(!openSize)}
                >
                  {size.length ? size : "請選擇尺寸"}
                  <ChevronDownIcon className="w-5 h-5 text-gray-800 " />
                </div>

                {openSize && (
                  <div className="absolute w-full z-10 bg-white border border-gray-300 rounded-md mt-1">
                    {sizeOptions.map((sizeOption, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectSize(sizeOption)}
                      >
                        {sizeOption}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 顏色選擇區 */}
            {data.color &&
              data.color.some((colorOption) => colorOption !== "") && (
                <div className="relative w-full mt-4">
                  <div
                    className="cursor-pointer w-full text-xl text-gray-800 p-2 bg-white border border-gray-300 rounded-md flex justify-between items-center"
                    onClick={() => setOpenColor(!openColor)}
                  >
                    {color.length ? color : "請選擇顏色"}
                    <ChevronDownIcon className="w-5 h-5 text-gray-800 " />
                  </div>

                  {openColor && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1">
                      {data.color.map((colorOption, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectColor(colorOption)}
                        >
                          {colorOption}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            {/* 現購與預購選擇區 */}
            <div className="flex mt-4 space-x-4">
              {data.goods.map((goodsOption, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md font-bold ${
                    goods === goodsOption
                      ? "bg-red-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleSelectGoods(goodsOption)}
                >
                  {goodsOption}
                </button>
              ))}
            </div>

            <div className="flex mt-10 space-x-4 items-center">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l w-12"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                readOnly
                className="border rounded-md p-2 w-full text-center "
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r w-12 "
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCartAlert}
              disabled={
                data.category === "飾品"
                  ? goods.length === 0 // 如果是飾品，僅需檢查 goods 是否被選擇
                  : !(size.length > 0 && goods.length > 0 && color)
              }
              className={`mt-6 py-2 rounded-md ${
                (size.length > 0 && goods.length > 0 && color) ||
                (data.category === "飾品" && goods.length > 0)
                  ? "bg-red-400 text-white"
                  : "bg-gray-300 text-gray-400"
              }`}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>

      {/* 彈窗顯示區 */}
      {showAlert && (
        <AddToCartAlert message={alertMessage} onClose={closeAlert} />
      )}
      <EndPage />
    </>
  );
}

export default DetailedProducts;