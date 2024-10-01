import { useState, useEffect } from "react";
import { getAuthToken } from "./utils";
import { getMe } from "./WebAPI";
import React from "react";
import RoutesComponent from "./RoutesComponent";
import HomePage from "./HomePage";
import Information from "./Information";
import ProductInformation from "./ProductInformation";
import PayAndTo from "./PayAndTo";
import Question from "./Question";
import Privacy from "./Privacy";
import HotThing from "./HotThing";
import AllProducts from "./AllProducts";
import Clothes from "./Clothes";
import Pants from "./Pants";
import Skirt from "./Skirt";
import Dress from "./Dress";
import Coat from "./Coat";
import Accessories from "./Accessories";
import Ring from "./Ring";
import Earring from "./Earring";
import Necklace from "./Necklace";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import MyAccount from "./MyAccount";
import AuthContext from "./contexts";

function App() {
  const [user, setUser] = useState(null);
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);
  useEffect(() => {
    // 以 getAuthToken 從 localStorage 讀取 token
    if (getAuthToken()) {
      // 有 token 才 call API
      getMe()
        .then((response) => {
          if (response.ok) {
            setUser(response.data);
          }
          setLoadingGetMe(false);
        })
        .catch(() => {
          setLoadingGetMe(false);
        });
    } else {
      setLoadingGetMe(false);
    }
  }, []);
  if (isLoadingGetMe) {
    return <div>Loading...</div>; // 在加載時顯示 Loading
  }

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <RoutesComponent>
          <HomePage />

          <Login />
          <ForgetPassword/>
          <MyAccount/>

          <Information>
            <ProductInformation />
            <PayAndTo />
            <Question />
          </Information>

          <AllProducts />
          <HotThing />
          <Clothes />
          <Pants />
          <Skirt />
          <Dress />
          <Coat />

          <Accessories />
          <Ring />
          <Earring />
          <Necklace />

          <Privacy />
        </RoutesComponent>
      </AuthContext.Provider>
    </>
  );
}

export default App;
