import { getAuthToken } from "./utils";

// 登入
export const login = (username, password) => {
  return fetch(`${"https://student-json-api.lidemy.me"}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 身分驗證
export const getMe = () => {
  // 從 localStorage 讀取 token
  const token = getAuthToken();
  return fetch(`${"https://student-json-api.lidemy.me"}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
