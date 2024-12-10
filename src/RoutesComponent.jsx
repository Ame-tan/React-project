import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ProductInformation from './ProductInformation';
import PayAndTo from "./PayAndTo";
import Question from "./Question";
import Information from "./Information";
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
import Register from "./Register";
import Logout from "./Login";
import MyAccount from "./MyAccount";
import OrderManagement from "./OrderManagement";
import ShopCar from "./ShopCar";
import DetailedProducts from "./DetailedProducts";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/MyAccount/?tab=orders" element={<OrderManagement />} />
            <Route path="/ShopCar" element={<ShopCar />} />
            

            <Route path="/products/:id" element={<DetailedProducts />} />


            <Route path="/Information" element={<Information />} />
                <Route path="/ProductInformation" element={<ProductInformation />} />
                <Route path="/PayAndTo" element={<PayAndTo />} />
                <Route path="/Question" element={<Question />} />

            <Route path="/HotThing" element={<HotThing />} />

            <Route path="/AllProducts" element={<AllProducts />} />  
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
      </Routes>
    </Router>
  );
};

export default RoutesComponent;