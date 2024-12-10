import { addToCart, fetchProductPrice, updateQuantity } from "./cartSlice"; // 確保正確引入 addToCart

export const handleAddToCartWithPrice =
  ({ productId, quantity, size, color, goods }) =>
  async (dispatch) => {
    try {
      // 從 Firestore 獲取商品價格
      const price = await fetchProductPrice(productId);

      // 調用原本的 addToCart
      dispatch(
        addToCart({
          productId,
          quantity,
          size,
          color,
          goods,
          price, // 傳遞獲取到的價格
        })
      );
    } catch (error) {
      console.error("加入購物車時獲取價格失敗:", error);
    }
  };

export const handleUpdateQuantityWithPrice =
  ({ productId, quantity, size, color, goods }) =>
  async (dispatch) => {
    try {
      const price = await fetchProductPrice(productId);

      // 調用原本的 updateQuantity
      dispatch(
        updateQuantity({
          productId,
          quantity,
          size,
          color,
          goods,
          price,
        })
      );
    } catch (error) {
      console.error("更新數量時獲取價格失敗:", error);
    }
  };
