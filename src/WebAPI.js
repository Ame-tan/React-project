// import { getAuthToken } from "./utils";
// import $ from "jquery";

// // 登入
// export const login = (username, password) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: "https://student-json-api.lidemy.me/login",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify({
//         username,
//         password,
//       }),
//       success: function (data) {
//         resolve(data); // 成功後返回數據
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         console.error("Error Details:", jqXHR.responseText);
//         const errorData = jqXHR.responseJSON; // 取得錯誤資料
//         const errorMessage = errorData?.message || "登入失敗"; // 若有錯誤訊息則返回，否則使用預設訊息
//         reject(new Error(errorMessage)); // 拒絕 Promise，傳回錯誤訊息
//       },
//     });
//   });
// };

// // 身分驗證
// export const getMe = () => {
//   const token = getAuthToken(); // 從 localStorage 取得 token
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: "https://student-json-api.lidemy.me/me",
//       type: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       success: function (response) {
//         resolve(response); // 成功後返回數據
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         reject(new Error("獲取用戶資料失敗")); // 捕獲錯誤並返回
//       },
//     });
//   });
// };

// // 註冊
// export const register = (nickname, username, password) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: "https://student-json-api.lidemy.me/register",
//       type: "POST",
//       contentType: "application/json",
//       data: JSON.stringify({
//         nickname,
//         username,
//         password,
//       }),
//       success: function (data) {
//         resolve(data);
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         const errorData = jqXHR.responseJSON; // 取得錯誤資料
//         const errorMessage = errorData?.message || "註冊失敗"; // 若有錯誤訊息則返回，否則使用預設訊息
//         reject(new Error(errorMessage)); // 拒絕 Promise，傳回錯誤訊息
//       },
//     });
//   });
// };
