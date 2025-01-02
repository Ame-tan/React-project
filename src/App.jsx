import { AuthProvider } from "./components/Auth/AuthContext";
import RoutesComponent from "./routes/RoutesComponent";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RoutesComponent /> {/* 路由管理所有頁面 */}
      </Provider>
    </AuthProvider>
  );
}

export default App;
