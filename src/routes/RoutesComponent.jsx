import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductInformation from '../components/NavColumn-pages/ProductInformation';
import PayAndTo from "../components/NavColumn-pages/PayAndTo";
import Question from "../components/NavColumn-pages/Question";
import Information from "../components/NavColumn-pages/Information";
import Privacy from "../components/NavColumn-pages/Privacy";
import HotThing from "../components/NavColumn-pages/HotThing";
import AllProducts from "../components/NavColumn-pages/AllProducts";
import Clothes from "../components/NavColumn-pages/Clothes";
import Pants from "../components/NavColumn-pages/Pants";
import Skirt from "../components/NavColumn-pages/Skirt";
import Dress from "../components/NavColumn-pages/Dress";
import Coat from "../components/NavColumn-pages/Coat";
import Accessories from "../components/NavColumn-pages/Accessories";
import Ring from "../components/NavColumn-pages/Ring";
import Earring from "../components/NavColumn-pages/Earring";
import Necklace from "../components/NavColumn-pages/Necklace";
import Login from "../components/Auth/Login";  
import Register from "../components/Auth/Register";
import Logout from "../components/Auth/Login";
import MyAccount from "../components/MyAccount-pages/MyAccount";
import ShopCar from "../components/ShopCar-pages/ShopCar";
import DetailedProducts from "../pages/DetailedProducts";
import MainLayout from "../layouts/MainLayout";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<MainLayout />}>

            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/ShopCar" element={<ShopCar />} />

            <Route path="/Information" element={<Information />} />
                <Route path="/ProductInformation" element={<ProductInformation />} />
                <Route path="/PayAndTo" element={<PayAndTo />} />
                <Route path="/Question" element={<Question />} />

            <Route path="/HotThing" element={<HotThing />} />

            <Route path="/AllProducts" element={<AllProducts />} />  
              <Route path="/products/:id" element={<DetailedProducts />} />
                <Route path="/Clothes" element={<Clothes />} />    
                <Route path="/Pants" element={<Pants />} /> 
                <Route path="/Skirt" element={<Skirt />} /> 
                <Route path="/Dress" element={<Dress />} /> 
                <Route path="/Coat" element={<Coat />} /> 

            <Route path="/Accessories" element={<Accessories />} /> 
                <Route path="/Ring" element={<Ring />} />
                <Route path="/Earring" element={<Earring />} />
                <Route path="/Necklace" element={<Necklace />} />


            <Route path="/Privacy" element={<Privacy />} />
          </Route>
      </Routes>
    </Router>
  );
};

export default RoutesComponent;