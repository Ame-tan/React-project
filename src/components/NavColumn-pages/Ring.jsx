import React, { useState, useContext } from "react";
import TopAll from "../../layouts/Header";
import useSWR from "swr";
import axios from "axios";
import AddToCartAlert from "../Common-components/AddToCartAlert";
import ProductItem from "../Common-components/ProductItem";
import AuthContext from "../Auth/AuthContext";
import EndPage from "../../layouts/Footer";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Ring() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useContext(AuthContext);

  const handleAddToCartAlert = () => {
    setAlertMessage(user ? "加入成功！" : "請先登入！");
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const { data, error } = useSWR(
    "http://localhost:4000/products?_embed=images&category=飾品&type=ring",
    fetcher
  );

  console.log("Data:", data);
  console.log("Error:", error);

  if (!data) return <div>Loading...</div>;

  const ringProducts = (data || []).filter(
    (product) => product.category === "飾品" && product.type === "ring"
  );

  return (
    <>
      <TopAll />

      <div className="product-container">
        <div className="product-toptext">
          <span>戒指</span>
        </div>

        <div className="product-grid-container">
          <div className="product-grid">
            {ringProducts.map((product) => {
              const firstImage =
                product.images && product.images.length > 0
                  ? product.images[0].path
                  : null;
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
      <EndPage />
    </>
  );
}

export default Ring;