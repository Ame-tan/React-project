import React from "react";
import TopAll from "./TopAll";
import EndPage from "./EndPage";
import { Link } from "react-router-dom";

function Information() {
  return (
    <>
      <TopAll />

      <div className="product-text-container">
        <div className="lg:w-1/2 w-full  sm:text-2xl">
            <div className="flex items-center justify-center m-20">
              【 購 物 指 南 】
            </div>
            <div className="flex items-center justify-center m-16">
              <Link to="/ProductInformation">▸ 商品資訊</Link>
            </div>
            <div className="flex items-center justify-center m-16">
              <Link to="/PayAndTo">▸ 付款＆配送說明</Link>
            </div>
            <div className="flex items-center justify-center m-16">
              <Link to="/Question">▸ 常見問題</Link>
            </div>

        </div>
      </div>
      <EndPage />
    </>
  );
}

export default Information;
