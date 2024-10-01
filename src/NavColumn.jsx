import { ChevronDownIcon } from "@heroicons/react/solid";


function NavColumn() {
  return (
    <div className="TOP-2  flex  items-center  justify-center  space-x-20  divide-x  divide-gray-300">

      <div className="Infor   relative group ">
        <a href="Information">
        <button className="text-xl  text-gray-800  p-2  flex  items-center   shadow-gray-950  space-x-1">
          <span>資訊</span>
          <ChevronDownIcon className="w-5 h-5 text-gray-800" />
        </button></a>
        <div
          className="absolute bg-white border border-gray-300 rounded-md  w-48 z-10  opacity-0  group-hover:opacity-100  duration-300  pointer-events-none group-hover:pointer-events-auto  "
        >
          <a href="ProductInformation" className="block  px-4  py-2  text-gray-800   hover:bg-gray-100 ">
            商品資訊
          </a>
          <a href="PayAndTo" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            付款&配送說明
          </a>
          <a href="Question" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            常見問題
          </a>
        </div>
      </div>
{/*relative group = 讓absolute絕對定位定最近的相對定位relative(下拉式選單) group對子元素做特定樣式變化 如+hover */}

        <div className="Hot">
          <a href="HotThing">
          <button className="text-xl  text-gray-800  p-2  flex  items-center  shadow-gray-950  space-x-1">
            <span>熱銷商品</span>
          </button></a>
        </div>


      <div className="Allshop   relative group">
        <a href="AllProducts">
        <button className="text-xl  text-gray-800  p-2  flex  items-center  shadow-gray-950  space-x-1">
          <span>所有商品</span>
          <ChevronDownIcon className="w-5  h-5  text-gray-800" />
        </button></a>
        <div
          className="absolute  bg-white border  border-gray-300  rounded-md    w-48  z-10   opacity-0  group-hover:opacity-100  duration-300  pointer-events-none group-hover:pointer-events-auto"
        >
          <a href="Clothes" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            上衣
          </a>
          <a href="Pants" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            褲子
          </a>
          <a href="Skirt" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            裙子
          </a>
          <a href="Dress" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            洋裝
          </a>
          <a href="Coat" className="block  px-4 py-2  text-gray-800   hover:bg-gray-100">
            外套
          </a>
        </div>
      </div>


      <div className="Acsr   relative group">
        <a href="Accessories">
        <button className="text-xl  text-gray-800  p-2  flex items-center  shadow-gray-950  space-x-1">
          <span>飾品</span>
          <ChevronDownIcon className="w-5  h-5  text-gray-800" />
        </button></a>
        <div
          className="absolute  bg-white  border  border-gray-300  rounded-md  w-48  z-10  opacity-0  group-hover:opacity-100  duration-300  pointer-events-none group-hover:pointer-events-auto"
        >
          <a href="Earring" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            耳環
          </a>
          <a href="Necklace" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            項鍊
          </a>
          <a href="Ring" className="block  px-4  py-2  text-gray-800  hover:bg-gray-100">
            戒指
          </a>
        </div>
      </div>


      <div>
        <a href="Privacy">
        <button className="Privacy   text-xl  text-gray-800  p-2  flex  items-center  shadow-gray-950 space-x-1">
          <span>隱私政策</span>
        </button></a>
      </div>

    </div>
  );
}

export default NavColumn;
