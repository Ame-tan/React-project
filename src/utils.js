export const money = (money) => {
  return Math.floor(money).toLocaleString();
};

const TOKEN_NAME = "token";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

import { auth } from "./firebase"; // 假設你的 Firebase 配置已經寫好

const getCurrentUserUid = () => {
  const user = auth.currentUser; // 取得當前登入的用戶
  if (user) {
    console.log("Current User UID:", user.uid); // 取得當前用戶的 UID
  } else {
    console.log("No user is signed in");
  }
};
