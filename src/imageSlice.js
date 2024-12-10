import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase"; // 確保這裡是你導入 Firebase 的正確路徑
import { collection, getDocs } from "firebase/firestore"; // 引入 Firestore 的新 API

export const getImages = createAsyncThunk("images/getImages", async () => {
  const imagesCollection = collection(db, "images"); // 使用 Firestore 的集合
  const snapshot = await getDocs(imagesCollection); // 使用新的 getDocs 方法
  const imagesData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return imagesData; // 返回圖片資料
});

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectImages = (state) => state.images.images;
export const selectLoading = (state) => state.images.loading;

export default imageSlice.reducer;
