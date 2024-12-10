const admin = require("firebase-admin");
const fetch = require("node-fetch"); // 用於獲取 JSON 檔案的模組

// 替換為你的 Firebase 服務賬戶金鑰
const serviceAccount = require("./myapp-f31f4-firebase-adminsdk-79jpz-81986671cc.json");
console.log("serviceAccount", serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // 獲取 Firestore 實例

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
      color: product.color || [], // 確保 color 欄位存在
      goods: product.goods || [], // 確保 goods 欄位存在
    });
  });

  await batch.commit(); // 提交批量寫入
  console.log("所有產品已成功導入 Firestore");
};

// 開始導入
importProductsToFirestore().catch(console.error);
