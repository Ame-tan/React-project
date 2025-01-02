import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// 定義 loadCart 的異步操作
export const loadCart = createAsyncThunk("cart/loadCart", async (userId) => {
  const cartRef = doc(db, "carts", userId);
  const cartDoc = await getDoc(cartRef);
  const cartItems = cartDoc.exists() ? cartDoc.data().items : [];
  console.log(cartItems);
  return cartItems.filter(
    (item) =>
      item.productId && item.size && item.quantity && item.color && item.goods
  );
});

// 定義 saveCartToFirestore 的函數
export const saveCartToFirestore = async (userId, cartItems) => {
  const filteredCartItems = cartItems.filter(
    (item) =>
      item.productId &&
      item.size &&
      item.color &&
      item.goods &&
      item.quantity > 0
  );

  const userCartRef = doc(db, "carts", userId);
  try {
    await setDoc(userCartRef, { items: filteredCartItems }, { merge: true });
  } catch (error) {
    console.error("保存購物車失敗", error);
  }
};

// 定義從 Firestore 獲取商品價格的輔助函數
export const fetchProductPrice = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);
    return productDoc.exists() ? productDoc.data().money || 0 : 0;
  } catch (error) {
    console.error("獲取商品價格失敗:", error);
    return 0;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: (() => {
      const storedItems = localStorage.getItem("cartItems");

      // 檢查是否存在 'cartItems' 且該項目不是 "undefined"
      if (storedItems === "undefined" || storedItems === null) {
        console.error("localStorage 中 cartItems 不是有效數據，返回空陣列");
        return []; // 返回空陣列
      }

      try {
        // 如果從 localStorage 獲取的數據是有效 JSON 格式，解析它
        return storedItems ? JSON.parse(storedItems) : [];
      } catch (error) {
        console.error("解析 localStorage 中 cartItems 時出錯:", error);
        return []; // 返回空陣列，防止應用崩潰
      }
    })(),
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    //商品總價格(每件商品的加總)
    calculateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * (item.price || 0),
        0
      );
    },
    addToCart: (state, action) => {
      const { productId, quantity, size, color, goods, price } = action.payload;
      if (quantity <= 0) {
        console.error("數量必須大於0");
        return;
      }

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === productId &&
          JSON.stringify(item.color) === JSON.stringify(color) &&
          JSON.stringify(item.goods) === JSON.stringify(goods) &&
          JSON.stringify(item.size) === JSON.stringify(size)
      );

      if (existingItemIndex !== -1) {
        // 如果商品已存在，更新數量
        state.items[existingItemIndex].quantity = quantity; // 將數量累加
      } else {
        const price = action.payload.price || 0;
        state.items.push({
          productId,
          quantity,
          size,
          color,
          goods,
          price,
        });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * (item.price || 0),
        0
      );
    },

    updateQuantity: (state, action) => {
      const { productId, quantity, size, color, goods } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          (item.size === size || (size && item.size.length === 0)) &&
          (item.color === color || (color && item.color.length === 0)) &&
          item.goods === goods
      );

      if (existingItem) {
        existingItem.quantity = quantity; // 更新數量
      } else {
        // 若不存在則新增
        state.items.push({
          productId,
          quantity,
          size,
          color,
          goods,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // 同步 localStorage
    },

    removeFromCart: (state, action) => {
      const { productId, size, color, goods } = action.payload || {};
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            JSON.stringify(item.size) === JSON.stringify(size) &&
            JSON.stringify(item.color) === JSON.stringify(color) &&
            JSON.stringify(item.goods) === JSON.stringify(goods)
          )
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * (item.price || 0),
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.quantity * (item.price || 0),
          0
        );
        state.loading = false;
        state.error = null;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalPrice;

export const {
  setCartItems,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
  calculateTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
