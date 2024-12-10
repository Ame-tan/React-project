import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // 引入 Firebase 的身份驗證模組
import AuthContext from "./contexts";
import RoutesComponent from "./RoutesComponent";
import { Provider } from "react-redux";
import { store } from "./store"; // 引入 store

function App() {
  const [user, setUser] = useState(null);
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);

  useEffect(() => {
    const auth = getAuth(); // 獲取 Firebase 的身份驗證實例

    // 監聽身份驗證狀態變化
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 設置用戶資料
      } else {
        setUser(null); // 沒有用戶時設為 null
      }
      setLoadingGetMe(false); // 設置加載狀態為 false
    });

    return () => unsubscribe(); // 清理監聽
  }, []);

  // 如果還在加載中，隱藏內容不進行渲染
  if (isLoadingGetMe) {
    return null; // 這裡可以返回 Loading 組件或其他內容
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {/* Redux Provider 應該包裹整個應用 */}
      <Provider store={store}>
        <RoutesComponent /> {/* 路由管理應該包含所有頁面 */}
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
