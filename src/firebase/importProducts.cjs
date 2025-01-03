import admin from "firebase-admin";
import fetch from "node-fetch";
import serviceAccount from "./myapp-f31f4-firebase-adminsdk-79jpz-81986671cc.json" assert { type: "json" }; // 用於導入 JSON 文件

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 從 JSON API 獲取產品資料
const fetchProducts = async () => {
  const response = await fetch("http://localhost:4000/products");
  const products = await response.json();
  return products;
};

// 將產品資料寫入 Firestore
const importProductsToFirestore = async () => {
  const products = await fetchProducts();

  const batch = db.batch(); // 使用批量寫入提高性能

  products.forEach((product) => {
    const productRef = db.collection("products").doc(product.id.toString()); // 使用 product.id 作為文檔 ID
    batch.set(productRef, {
      id: product.id,
      category: product.category,
      description: product.description,
      money: product.money || [],
      popular: product.popular,
      type: product.type,
      color: product.color || [],
      goods: product.goods || [],
    });
  });

  await batch.commit(); // 提交批量寫入
  console.log("所有產品已成功導入 Firestore");
};

// 開始導入
importProductsToFirestore().catch(console.error);
