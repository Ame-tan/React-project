import React from "react";
import TopAll from "./TopAll"

function PayAndTo() {
  return (
    <>
      <TopAll/>

      <div className="bg-white w-full max-h-1000px p-4 flex items-center justify-center ">
        <div className="w-1/2 h-1000px  p-20  text-lg">
          // 付 款 & 配 送 說 明 //
          <br />
          <br />
          ▸ 付款相關
          <br />
          <br />
          <div className="font-bold">【銀行轉帳/ATM】</div>
          <br />
          選此付款方式時，下方會顯示一組銀行匯款帳號，請女孩們在3日內完成匯款並告知著・您的帳號後五碼。
          <br />
          <br />
          ＊告知方式：
          <br />
          <br />
          1.
          匯款完成後至訂單mail，點選“訂單連結”後，拉至最下方的“賣家和顧客訂單通訊”欄位填寫發送即可。
          <br />
          <br />
          2.
          至官網登入會員，目錄--帳戶--訂單--查閱，拉至最下方的“賣家和顧客訂單通訊”欄位填寫發送即可。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">【網路ATM】</div>
          <br />
          使用綠界支付平台系統，女孩們需使用Windows桌機+外接讀卡機+IE瀏覽器進行線上付款動作，另因系統會自動顯示繳費狀態，所以不需回覆匯款資訊。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">【信用卡】</div>
          <br />
          使用綠界支付平台系統，各家銀行的Visa、Master、JBC信用卡，皆可使用，另因系統會自動顯示繳費狀態，所以不需回覆匯款資訊。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          ▸ 配送相關
          <br />
          <br />
          <ul className="list-disc pl-5 ">
            <li>出貨時間為平日周一至周五</li>
          </ul>
          <br />
          <br />
          <div className="font-bold">​【7-11/全家到店純取貨】</div>
          <br />
          自動發MAIL通知，另門市系統也會發簡訊告知，請務必留意當初於網站購物時所登記之MAIL信件以及手機簡訊通知，需於包裹抵達門市起算
          7日內取貨，取貨時務必攜帶與收貨人同姓名之證明證件(如：身份證、健保卡、駕照)，逾期未取貨者需負擔再次寄送之運費60。
          <br />
          <br />
          ＊收到退回商品後提供女孩們銀行帳號，待女孩們將運費補足後再將商品寄出。
          <br />
          <br />
          ＊EX.現貨方式：
          <br />
          <br />
          14號下訂付款完成，16-17號寄出，預計19-20號會配達指定門市，直接取貨。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">【7-11/全家取貨付款】</div>
          <br />
          自動發MAIL通知，另門市系統也會發簡訊通知，請務必留意當初於網站購物時所登記之MAIL信件以及手機簡訊通知，需於包裹抵達門市起算
          7日內取貨，取貨時建議攜帶與收貨人同姓名之證明證件(如：身份證、健保卡、駕照)，
          <span className="text-red-500 font-bold border-b-2 border-red-200">
            1次逾期未取貨者，帳號將會被加入黑名單。
          </span>
          <br />
          <br />
          ＊EX.現貨方式：
          <br />
          <br />
          14號下訂完成，16-17號寄出，預計19-20號會配達指定門市，付款取貨。
          <br />
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">【本地郵寄】</div>
          <br />
          <ul className="list-disc pl-5 ">
            <li>週六、週日、國定假日及連續假日期間不投遞。</li>
            <li>使用中華郵政包裹，寄出後約隔2~5天左右會到。</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PayAndTo;
