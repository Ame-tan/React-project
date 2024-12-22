import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="container mx-auto pt-20 md:pt-40">
      {/* 這裡可以放導航欄或其他全局的內容 */}
      <Outlet />
      
    </main>
  );
};

export default MainLayout;
