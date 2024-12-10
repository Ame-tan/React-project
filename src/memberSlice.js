import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // 引入已初始化的 Firestore 實例

// 定義 loadMemberData 的異步操作
export const loadMemberData = createAsyncThunk(
  "member/loadMemberData",
  async (uid, { dispatch }) => {
    const memberRef = doc(db, "members", uid);
    const memberDoc = await getDoc(memberRef);
    if (memberDoc.exists()) {
      return memberDoc.data(); // 如果有資料，直接返回
    } else {
      console.log("No such document, creating new data...");
      // 初始化資料
      const initialData = {
        country: "",
        city: "",
        area: "",
        year: "",
        month: "",
        day: "",
        selectedCode: "",
        countryAbbr: "",
        phoneNumber: "",
        receiverName: "",
        receiverPhone: "",
        addressStreet: "",
        notes: "",
      };
      // 儲存初始資料
      await dispatch(
        saveMemberDataToFirebase({ uid, memberData: initialData })
      );
      return initialData || ""; // 返回初始化的資料
    }
  }
);

// 定義 saveMemberDataToFirebase 的異步操作
export const saveMemberDataToFirebase = createAsyncThunk(
  "member/saveMemberDataToFirebase",
  async ({ uid, memberData }, { rejectWithValue }) => {
    const memberRef = doc(db, "members", uid); // 根據 uid 儲存資料
    try {
      await setDoc(memberRef, memberData, { merge: true }); // 使用 merge:true 保證不會覆蓋已有資料
      return memberData; // 返回儲存後的資料以便更新 Redux 狀態
    } catch (error) {
      console.error("保存個人資料失敗", error);
      return rejectWithValue("保存個人資料失敗"); // 返回錯誤訊息
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    data: null, // 用來儲存用戶資料
    loading: false, // 載入狀態
    isSaving: false, // 新增 isSaving 標誌
    error: null, // 錯誤狀態
  },
  reducers: {
    setMemberData(state, action) {
      // 將 action.payload 的資料存入 state.data
      state.data = action.payload;
    },
    clearMemberData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMemberData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMemberData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadMemberData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveMemberDataToFirebase.pending, (state) => {
        state.isSaving = true; // 開始保存資料時設為 true
        state.error = null;
      })
      .addCase(saveMemberDataToFirebase.fulfilled, (state, action) => {
        state.isSaving = false; // 保存成功後設為 false
        state.data = action.payload;
      })
      .addCase(saveMemberDataToFirebase.rejected, (state, action) => {
        state.isSaving = false; // 保存成功後設為 false
        state.error = action.payload || "保存個人資料失敗";
      });
  },
});

export const { clearMemberData, setMemberData } = memberSlice.actions;

export default memberSlice.reducer;
