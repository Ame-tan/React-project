import React from "react";
import TopAll from "../../layouts/Header";
import EndPage from "../../layouts/Footer";

function Privacy() {
  return (
    <>
      <TopAll />

      <div className="product-text-container">
        <div className="lg:w-1/2 w-full p-10  text-lg">
          <div className="flex items-center lg:justify-center justify-start pb-20 font-bold text-2xl">
            隱私政策
          </div>
          <div className="font-bold">一、隱私權保護政策的適用範圍</div>
          <br />
          <div className="text-gray-600">
            隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
          </div>
          <br />
          <br />
          <div className="font-bold">二、個人資料的蒐集、處理及利用方式</div>
          <br />
          <div className="text-gray-600">
            <ul className="list-disc pl-5">
              <li>
                當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。
              </li>
              <li>
                本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。
              </li>
              <li>
                於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。
              </li>
              <li>
                為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。
              </li>
            </ul>
          </div>
          <br />
          <br />
          <div className="font-bold">三、資料之保護</div>
          <br />
          <div className="text-gray-600">
            <ul className="list-disc pl-5">
              <li>
                只由經過授權的人員才能接觸您的個人資料，如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
              </li>
            </ul>
          </div>
          <br />
          <br />
          <div className="font-bold">四、網站對外的相關連結</div>
          <br />
          <div className="text-gray-600">
            本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
          </div>
          <br />
          <br />
          <div className="font-bold">五、與第三人共用個人資料之政策</div>
          <br />
          <div className="text-gray-600">
            本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
            <br />
            <br />
            前項但書之情形包括不限於：
            <br />
            <br />
            <ul className="list-disc pl-5">
              <li>經由您書面同意。</li>
              <li>法律明文規定。</li>
              <li>為免除您生命、身體、自由或財產上之危險。</li>
              <li>
                與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。
              </li>
              <li>
                當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
              </li>
              <li>有利於您的權益。</li>
              <li>
                本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。
              </li>
            </ul>
          </div>
          <br />
          <br />
          <div className="font-bold">六、Cookie之使用</div>
          <br />
          <div className="text-gray-600">
            為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導至網站某些功能無法正常執行
            。{" "}
          </div>
          <br />
          <br />
          <div className="font-bold">七、隱私權保護政策之修正</div>
          <br />
          <div className="text-gray-600">
            本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
          </div>
          <br />
          <br />
          <div className="font-bold">八、資料之查閱與刪除</div>
          <br />
          <div className="text-gray-600">
            <ul className="list-disc pl-5">
              <li>
                會員能隨時在網站的會員帳號查看授權的姓名與電郵資料，並且僅作為商店會員、訂單資料的內容。
              </li>
              <li>
                商店依照本人請求，可透過商店右上角聯絡我們管道提出刪除、停止使用該個人資料的要求。
              </li>
            </ul>
          </div>
        </div>
      </div>
      <EndPage />
    </>
  );
}

export default Privacy;
