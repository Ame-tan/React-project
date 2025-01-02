export const getAuthToken = async (user) => {
  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("獲取 Token 失敗:", error);
      return null;
    }
  }
  return null; // 如果用戶未登入，返回 null
};
