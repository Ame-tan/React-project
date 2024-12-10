import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import imageReducer from "./imageSlice"; // 確保導入 imageSlice
import memberReducer from "./memberSlice";
import orderReducer from "./orderSlice";

// 配置 Redux Store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    images: imageReducer,
    member: memberReducer,
    orders: orderReducer,
  },
});

export default store;
