import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="container mx-auto pt-20 md:pt-40">
      <Outlet />
    </main>
  );
};

export default MainLayout;
