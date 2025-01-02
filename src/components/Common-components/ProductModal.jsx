import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/solid";
import AddToCartAlert from "./AddToCartAlert";
import { auth } from "../../firebase/firebase";
import { handleAddToCartWithPrice } from "./AddPriceToCart";

const ProductModal = ({ product, images, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [nowImage, setNowImage] = useState(0);
  const [size, setSize] = useState([]);
  const [openSize, setOpenSize] = useState(false);
  const sizeOptions = ["S", "M", "L"]; // 手動增加size欄位
  const [color, setColor] = useState([]);
  const [openColor, setOpenColor] = useState(false);
  const [goods, setGoods] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const cartItems = useSelector((state) => state.cart.items);

  const user = auth.currentUser; // 獲取當前用戶

  const handleAddToCartAlert = () => {
    if (!user) {
      setAlertMessage("請先登入！");
      setShowAlert(true);
      return;
    }

    if (product.category === "飾品") {
      // 如果是飾品，不需要檢查尺寸
      if (!goods.length) {
        setAlertMessage("請選擇現購或預購！");
      } else {
        addToCartItem();
      }
    } else {
      if (!size.length) {
        setAlertMessage("請選擇尺寸！");
      } else if (product.color && product.color.length > 0 && !color.length) {
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
      const products = {
        id: product.id,
        color: color || [],
        goods: goods || [],
        size: size || [],
        quantity: quantity,
      };

      // 檢查購物車中是否已存在相同商品
      const existingItem = cartItems.find(
        (item) =>
          item.productId === products.id &&
          JSON.stringify(item.color) === JSON.stringify(products.color) &&
          JSON.stringify(item.goods) === JSON.stringify(products.goods) &&
          JSON.stringify(item.size) === JSON.stringify(products.size)
      );

      if (existingItem) {
        // 更新現有商品的數量
        const newQuantity = existingItem.quantity + quantity;
        dispatch(
          handleAddToCartWithPrice({
            productId: products.id,
            quantity: newQuantity,
            size: products.size,
            color: products.color,
            goods: products.goods,
          })
        );
        setAlertMessage("商品數量已更新！");
      } else {
        // 如果商品不存在，就新增新商品
        dispatch(
          handleAddToCartWithPrice({
            productId: products.id,
            quantity: quantity,
            size: products.size || [],
            color: products.color || [],
            goods: products.goods || [],
          })
        );
        setAlertMessage("加入成功！");
      }
    } else {
      setAlertMessage("請先登入！");
    }
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div
      className=" fixed inset-0 cursor-auto bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="container  relative bg-white px-5  py-5  mx-4 sm:mx-2 sm:w-2/3 sm:h-auto  max-w-screen-md  rounded-lg  cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          &times;
        </button>
        <div className="lg:flex max-w-screen-md max-h-screen-md justify-center items-center">
          <div className="relative  mx-auto max-w-80  h-full justify-center items-center">
            {images[nowImage] && (
              <img
                className="container   object-cover"
                src={images[nowImage].path}
                alt={`Product Image ${nowImage}`}
              />
            )}
            <div className="mt-4  h-auto space-x-4 lg:flex hidden">
              {images.map((image, index) => (
                <img
                  key={index}
                  className={`w-20 h-20 object-cover cursor-pointer ${
                    nowImage === index ? "border border-blue-500" : ""
                  }`}
                  src={image.path}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setNowImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="relative mx-auto max-w-80  lg:pl-3 h-full">
            <h1 className="text-2xl font-bold lg:pt-0 pt-3 ">
              {product.description}
            </h1>
            <p className="text-xl mt-4 ">NT${product.money.toLocaleString()}</p>

            {product.category !== "飾品" && (
              <div className="relative w-full lg:mt-10 mt-4 ">
                <div
                  className="cursor-pointer w-full text-xl text-gray-800 p-2 bg-white border border-gray-300 
                  rounded-md flex justify-between items-center "
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
            {product.color &&
              product.color.some((colorOption) => colorOption !== "") && (
                <div className="relative w-full  mt-4">
                  <div
                    className="cursor-pointer w-full text-xl text-gray-800 p-2 bg-white border border-gray-300 rounded-md flex justify-between items-center"
                    onClick={() => setOpenColor(!openColor)}
                  >
                    {color.length ? color : "請選擇顏色"}
                    <ChevronDownIcon className="w-5 h-5 text-gray-800 " />
                  </div>

                  {openColor && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1">
                      {product.color.map((colorOption, index) => (
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
            <div className="flex mt-10 space-x-4">
              {product.goods.map((goodsOption, index) => (
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

            <div className="flex lg:mt-10 mt-4  space-x-4 items-center justify-between ">
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
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r w-12"
              >
                +
              </button>
            </div>

            <div className="flex  items-center">
              <button
                onClick={handleAddToCartAlert}
                disabled={
                  product.category === "飾品"
                    ? goods.length === 0 // 如果是飾品，僅需檢查 goods 是否被選擇
                    : !(size.length > 0 && goods.length > 0 && color)
                }
                className={`lg:mt-10 mt-4 py-2 rounded-md w-full ${
                  (size.length > 0 && goods.length > 0 && color) ||
                  (product.category === "飾品" && goods.length > 0)
                    ? "bg-red-400 text-white"
                    : "bg-gray-300 text-gray-400"
                }`}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <AddToCartAlert message={alertMessage} onClose={closeAlert} />
      )}
    </div>
  );
};

export default ProductModal;
