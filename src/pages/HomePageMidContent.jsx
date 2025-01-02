import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import ImageCarousel from "./ImageCarousel";
import AddToCartAlert from "../components/Common-components/AddToCartAlert";
import ProductItem from "../components/Common-components/ProductItem";
import AuthContext from "../components/Auth/AuthContext";

function HomePageMidContent() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAddToCartAlert = () => {
    setAlertMessage(user ? "加入成功！" : "請先登入！");
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    // 獲取所有產品
    $.ajax({
      url: "http://localhost:4000/products?_embed=images",
      method: "GET",
      success: function (response) {
        setData(response);
        setLoading(false);
        console.log(response);
      },
      error: function (jqXHR, textStatus) {
        setError(`Error: ${textStatus}`);
        setLoading(false);
      },
    });
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!data) return <div>Product not found</div>;

  const HomeProducts = (data || []).filter(
    (product) => product.category !== "飾品"
  );

  return (
    <>
      <div className="ImageCarousel  container  bg-white  px-10  py-10">
        <ImageCarousel />
      </div>
      <div className="product-container">
        <div className="homepage-product-tag  mx-2  2xl:mx-32">
          <span className="md:font-bold pl-2">所有商品</span>
          <span className="md:font-light pl-2">All products</span>
        </div>

        <div className="product-grid-container">
          <div className="product-grid">
            {HomeProducts.map((product) => {
              const firstImage =
                product.images && product.images.length > 0
                  ? product.images[0].path
                  : null;
              // map 函數內記得正確加上return返回 ( ProductItem 組件 )
              return (
                <ProductItem
                  key={product.id}
                  product={product}
                  image={firstImage}
                  onAddToCart={handleAddToCartAlert}
                />
              );
            })}
            {showAlert && (
              <AddToCartAlert message={alertMessage} onClose={closeAlert} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageMidContent;
