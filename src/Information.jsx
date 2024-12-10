import React from "react";
import TopAll from "./TopAll";
import EndPage from "./EndPage";
import { Link } from "react-router-dom";

function Information() {
  return (
    <>
      <TopAll />

      <div className="container  lg:flex  lg:items-center  lg:justify-center  bg-white">
        <div className="lg:w-1/2 h-1000px  lg:p-20  p-10 text-lg">
          <div className="flex flex-col  text-2xl">
            <div className="flex items-center justify-center  m-14">
              【 購 物 指 南 】
            </div>
            <div className="flex items-center justify-center  m-14">
              <Link to="/ProductInformation">▸ 商品資訊</Link>
            </div>
            <div className="flex items-center justify-center  m-14">
              <Link to="/PayAndTo">▸ 付款＆配送說明</Link>
            </div>
            <div className="flex items-center justify-center  m-14">
              <Link to="/Question">▸ 常見問題</Link>
            </div>
          </div>
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default Information;
