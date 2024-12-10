// productSlice.js
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const getProducts = async () => {
  const productsCollection = collection(db, "products"); // 獲取 products 集合
  const productSnapshot = await getDocs(productsCollection); // 獲取所有文檔
  const productList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // 返回文檔資料
  }));
  return productList; // 返回產品列表
};
