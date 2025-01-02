import React from "react";
import TopAll from "../../layouts/Header";
import EndPage from "../../layouts/Footer";

function ProductInformation() {
  return (
    <>
      <TopAll />

      <div className="product-text-container">
        <div className="lg:w-1/2  p-10  text-lg ">
          // 商 品 資 訊 //
          <br />
          <br />
          ▸所有商品均採現貨+預購，特殊狀況會備註在商品描述的【庫存資訊】裡。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸現貨商品付款後約 2-3個工作日(不含例假日)出貨。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸預購商品約7-14個工作日(不含例假日)出貨，如遇缺貨將以mail另行通知。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸預購商品依據製作時間、貨物配送、海關檢驗等概估天數，每款商品到貨天數不盡相同，如提早到貨皆會提早出貨，若為急需商品的女孩，好好考慮後再作決定唷。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸如遇預購商品因廠商無法製作出貨導致斷貨情形，會在第一時間E-mail/簡訊為女孩們做說明，並取消訂單。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸訂單中有現貨+預購商品，會等預購商品到齊再一同出貨。若女孩希望先拿到現貨，要麻煩您拆單訂購商品。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸所有純銀商品售出後皆享有自付來回郵資半年內免費維修及保養的服務，如有需要歡迎隨時與我們聯繫。(請保持零件完整以便維修，如需耗材將另外酌收費用);電鍍商品如需維修及補鍍我們將視情況酌收工本費。
          <br />
          <br />
          ＊請附保卡
          <br />
          <br />
          🔺小提醒：商品呈現顏色會因電腦螢幕有所差異，以實體顏色為標準，如果女孩非常在意色差也請好好考慮後再做決定
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default ProductInformation;
