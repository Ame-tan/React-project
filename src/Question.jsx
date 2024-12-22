import React from "react";
import TopAll from "./TopAll";
import EndPage from "./EndPage";

function Question() {
  return (
    <>
      <TopAll />

      <div className="product-text-container">
        <div className="lg:w-1/2   p-10  text-lg"> 
          // 常 見 問 題 //
          <br />
          <br />
          <div className="font-bold">
            Q1、若購買的商品有現貨及預購會怎麼出貨?
          </div>
          <br />
          <div className="text-gray-600">
            A：會等預購商品到齊後再一起出貨，若買家希望先拿到現貨，那要麻煩您拆單訂購商品(預購商品一張訂單
            & 現貨商品一張訂單)。
          </div>
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">Q2、可以取消訂單嗎?</div>
          <br />
          <div className="text-gray-600">
            A：尚未執行出貨前皆可聯繫客服人員，提出時請一併給予訂單編號以供查詢/回覆;若已執行出貨則無法取消訂單。
          </div>
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">Q3、訂單可以加購嗎?</div>
          <br />
          <div className="text-gray-600  ">
            A：尚未執行出貨前皆可聯繫客服人員告知慾加購之商品;若已執行出貨則無法加購商品，需另行下訂。
          </div>
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">Q4、已選擇的超商門市可以更改嗎?</div>
          <br />
          <div className="text-gray-600">
            A：在訂單出貨前可以透過以下三種方式聯繫客服人員更改取貨門市，但若已經出貨之訂單恕無法變更取貨門市。
            <br />
            <br />
            <ul className="list-disc pl-5 ">
              <li>
                聯絡方式1-信箱內的系統通知信中可點選“訂單連結”最下方的“賣家和顧客訂單通訊”聯繫。
              </li>
              <li>
                聯絡方式2-至官網登入會員，我的帳戶-訂單-查閱，拉至最下方的“賣家和顧客訂單通訊”聯繫。
              </li>
            </ul>
          </div>
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">
            Q5、超商純取貨時要本人嗎? 若是超商取貨付款呢?
          </div>
          <br />
          <div className="text-gray-600">
            A：純取貨建議本人取貨，取貨時務必攜帶並出示與包裹姓名相同的身份證明文件(如身份證、健保卡、駕照)，而超商取貨付款一般不太會看證件，取貨時也比較不會強制要本人，但須明確知道取貨人名與金額。
          </div>
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">Q6、超取包裹送達門市時會如何通知?</div>
          <br />
          <div className="text-gray-600">A：寄出當日系統會發送mail通知。</div>
          <br />
          <div className="flex justify-center my-2">
            <div className="border-b border-gray-300 w-full" />
          </div>
          <br />
          <div className="font-bold">Q7、超取包裹忘記領取怎麼辦?</div>
          <br />
          <div className="text-gray-600">
            A：若您未於貨到後7日內取貨，貨品將退回原寄件門市，並通知寄件者取回，取回後會使用站內訂單留言給您，需請您補匯運費60後，我們將再次配送。
          </div>
          <br />
          <br />
          <div className="text-red-500  font-bold">
            ※ 一次超取未領取，也未通知重新寄出者，將設定入黑名單喔。
          </div>
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default Question;
