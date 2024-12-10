import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "./firebase"; // Firebase 引入
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { format } from "date-fns";

export const submitOrder = createAsyncThunk(
  "orders/submitOrder",
  async ({ cartItems, totalCartPrice }, { getState, rejectWithValue }) => {
    const user = auth.currentUser;

    if (!user) return rejectWithValue("未登入，無法提交訂單");
    const uid = user.uid;
    const orderId = `ORD-${Date.now()}`;
    const DateAndTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const orderData = {
      orderId,
      DateAndTime,
      totalPrice: totalCartPrice,
      status: "已付款",
      items: cartItems.map(({ productId, quantity, size, color, goods }) => ({
        productId,
        quantity,
        size,
        color,
        goods,
      })),
    };

    try {
      const orderRef = doc(db, "orders", uid); // 指向用戶的訂單文檔
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        // 如果文檔存在，使用 updateDoc 更新
        await updateDoc(orderRef, {
          orders: arrayUnion(orderData),
        });
      } else {
        // 如果文檔不存在，使用 setDoc 創建新文檔
        await setDoc(orderRef, {
          orders: [orderData],
        });
      }

      return orderData; // 返回新訂單數據
    } catch (error) {
      console.error("提交訂單失敗", error);
      return rejectWithValue("提交訂單時發生錯誤");
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) return rejectWithValue("未登入，無法獲取訂單");

    const uid = user.uid;

    try {
      const orderRef = doc(db, "orders", uid);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        return orderSnap.data().orders || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error("獲取訂單失敗", error);
      return rejectWithValue("獲取訂單時發生錯誤");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // 新增訂單到 Redux 狀態
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrderLoading = (state) => state.orders.loading;
export const selectOrderError = (state) => state.orders.error;

export default orderSlice.reducer;
