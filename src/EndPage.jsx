import React from "react";
import { Link } from "react-router-dom";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function EndPage() {
  return (
<>

  <div className="end-container ">
    {/* 左 */}
    <div className="flex  flex-col  justify-center  items-center  md:pt-14 md:pb-2 md:w-2/3">
      
      <h1 className="text-lg  text-gray-700  font-bold">購物指南</h1>
      <Link to="/ProductInformation" onClick={scrollToTop} className="sm:pt-9  pt-9  text-base text-gray-700">
        商品資訊
      </Link>
      <Link to="/PayAndTo" onClick={scrollToTop} className="sm:pt-9  pt-9  text-base text-gray-700">
        付款及配送說明
      </Link>
      <Link to="/Question" onClick={scrollToTop} className="sm:pt-9  pt-9  text-base text-gray-700">
        常見問題
      </Link>
    </div>

    {/* 右 */}
    <div className="flex  flex-col  justify-center  items-center  md:w-1/3 md:items-start md:pt-0  sm:pt-14  pt-14">
      <h1 className="text-lg   text-gray-700  font-bold">聯絡我們</h1>
      <Link to="/" onClick={scrollToTop} className="md:pt-18  pt-9  text-base text-gray-700">
        FACEBOOK
      </Link>
      <Link to="/" onClick={scrollToTop} className="md:pt-18  pt-9  text-base text-gray-700">
        INSTAGRAM
      </Link>
    </div>
  </div>
</>

  );
}

export default EndPage;
