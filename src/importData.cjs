var admin = require("firebase-admin");
var serviceAccount = require("./myapp-f31f4-firebase-adminsdk-79jpz-81986671cc.json"); // 確保路徑正確

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // 獲取 Firestore 實例

// 獲取圖片的第一張
const getFirstImage = (productId, images) => {
  const image = images.find((img) => img.productId === productId); // 假設圖片包含 productId
  return image ? image.url : null; // 返回圖片的 URL
};

// 將商品資訊和圖片合併到購物車中
const addToCartAsync = (item) => async (dispatch, getState) => {
  dispatch(addToCart(item)); // 更新 Redux 狀態
  const { cart } = getState(); // 獲取當前購物車狀態
  const user = auth.currentUser;

  if (user) {
    const productsResponse = await fetch("http://localhost:4000/products");
    const products = await productsResponse.json();

    const imagesResponse = await fetch("http://localhost:4000/images");
    const images = await imagesResponse.json();

    const updatedCartItems = cart.items.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product.id); // 獲取該商品的詳細資料
      const firstImage = getFirstImage(cartItem.product.id, images); // 獲取該商品的第一張圖片
      return {
        ...cartItem,
        firstImage, // 將第一張圖片加入商品資訊中
        color: product.color, // 將顏色加入商品資訊中
        goods: product.goods, // 將商品狀態加入商品資訊中
      };
    });

    // 將購物車項目保存到 Firestore
    await saveCartToFirestore(user.uid, updatedCartItems); // 同步到 Firestore
  }
};

// 將購物車數據保存到 Firestore
const saveCartToFirestore = async (userId, cartItems) => {
  try {
    const cartRef = db.collection("carts").doc(userId); // 獲取用戶的購物車文檔
    await cartRef.set({ items: cartItems }); // 將購物車項目寫入 Firestore
    console.log("Cart saved successfully to Firestore");
  } catch (error) {
    console.error("Error saving cart to Firestore:", error);
  }
};

// 將 addToCartAsync 導出
module.exports = { addToCartAsync }; // 將 addToCartAsync 函數導出
