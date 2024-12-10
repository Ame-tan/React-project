import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAddToCartWithPrice  } from "./AddPriceToCart"; // 引入 Redux action
import ProductModal from "./ProductModal";

function ProductItem({ product, image }) {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (quantity, size,color) => {
    dispatch(handleAddToCartWithPrice({ productId: product.id, quantity, size ,color,goods })); // 添加到購物車
    handleCloseModal(); // 關閉模態框
  };

  return (
    <div className="bg-white  cursor-pointer  relative  w-full  h-full  md:max-h-full  md:min-w-32 md:mx-auto lg:max-h-max  lg:max-w-60">
      <div className="relative group "> 
        <Link to={`/products/${product.id}`}>
          <button>
            {image && (
              <div className="product-image-container">
              <img
                src={image}
                alt={product.description}
                className="product-image"
              /></div>
            )}
          </button>
        </Link>
        <button onClick={handleOpenModal}>
          <div className="cart-button-md  hidden md:flex container h-10  text-center bottom-1 text-white  bg-slate-600 justify-center items-center">
            加入購物車
          </div>
        </button>
        <div className="button-block-sm">
    <button
      onClick={handleOpenModal}
      className="cart-button-sm"
    >
      加入購物車
    </button>
  </div>
      </div>
      <div className="relative group ">
        <Link to={`/products/${product.id}`}>
          <div className="flex-wrap flex text-left text-lg font-bold text-gray-500 bg-opacity-70 
                group-hover:text-gray-950 py-1">
            {product.description}
          </div>
        
        <div className="flex text-left text-lg font-bold text-gray-500 md:m-0 ">
          NT${product.money.toLocaleString()}
        </div></Link>
      </div>

      {/* 顯示模態框 */}
      {showModal && (
        <ProductModal
          product={product}
          images={product.images} // 假設 product 包含 images 屬性
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart} // 將添加到購物車的功能傳遞給模態框
        />
      )}
    </div>
  );
}

export default ProductItem;
