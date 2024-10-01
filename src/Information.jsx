import React from "react";
import TopAll from "./TopAll"

function Information() {
  return (
    <>
      <TopAll/>

      <div className="bg-white w-full max-h-1000px p-4 flex items-center justify-center ">
        <div className="w-1/2 h-1000px  p-20  text-lg  ">

            <div className="flex flex-col  text-2xl">
            <div className="flex items-center justify-center  m-14">【 購 物 指 南 】</div>
            <div className="flex items-center justify-center  m-14"><a href="ProductInformation">▸ 商品資訊</a></div>
            <div className="flex items-center justify-center  m-14"><a href="PayAndTo">▸ 付款＆配送說明</a></div>
            <div className="flex items-center justify-center  m-14"><a href="Question">▸ 常見問題</a></div>
            </div>

        </div>
      </div>  
    </>
  );
}

export default Information;
