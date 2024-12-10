// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ProductItem from "./ProductItem";
// import ShopCar from "./ShopCar";

// function Store() {
//   const [cartItems, setCartItems] = useState([]);

//   // 添加商品到購物車
//   const addToCart = (product) => {
//     const index = cartItems.findIndex((cartItem) => cartItem.id === product.id);
//     if (index !== -1) {
//       const newCartItems = [...cartItems];
//       newCartItems[index].quantity += 1;
//       setCartItems(newCartItems);
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* 傳遞 addToCart 給 ProductItem 組件 */}
//         <Route
//           path="/products/:id"
//           element={
//             <ProductItem product={product} onAddToCart={addToCart} />
//           }
//         />
//         {/* 傳遞 cartItems 給購物車頁面 */}
//         <Route path="/ShopCar" element={<ShopCar cartItems={cartItems} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Store;
