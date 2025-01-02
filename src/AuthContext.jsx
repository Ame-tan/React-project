import { createContext, useState, useEffect } from "react";
import { auth } from "./firebase"; // 假設你的 Firebase 配置已經寫好

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 用來儲存當前用戶
  const [loading, setLoading] = useState(true); // 控制加載狀態

  useEffect(() => {
    // 註冊 Firebase 認證狀態變化的監聽器
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 更新 user 狀態
      } else {
        setUser(null); // 用戶登出時設置為 null
      }
      setLoading(false); // 完成加載
    });

    return () => unsubscribe(); // 清理監聽器
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 可自定義 loading 介面
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
