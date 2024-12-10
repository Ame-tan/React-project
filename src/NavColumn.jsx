import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function NavColumn() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="top-container ">
      
    <div
      className="navcolumn-container  "
    >
      
      <nav className="bg-red w-full border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        {/* 三條線圖示 */}
        
        <div className="flex justify-start items-start px-2 sm:px-2 py-3  md:hidden">
          
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </div>
          </button>
        </div>

        {/* 導覽列 */}
        <div
          className={`md:flex md:justify-center md:items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="md:flex md:space-x-10 w-auto grid grid-cols-5 gap-x-4 gap-y-4 mt-4 md:mt-0">
            {/* 資訊 */}
            <div className="relative group ">
              <Link to="/Information">
                <button className="text-xl  text-gray-800 p-2 flex items-center">
                  <span>資訊</span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-800" />
                </button>
              </Link>
              <div className="absolute bg-white border border-gray-300 rounded-md w-48 z-10 opacity-0 group-hover:opacity-100 duration-300 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  to="/ProductInformation"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  商品資訊
                </Link>
                <Link
                  to="/PayAndTo"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  付款&配送說明
                </Link>
                <Link
                  to="/Question"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  常見問題
                </Link>
              </div>
            </div>

            {/* 熱銷商品 */}
            <div>
              <Link to="/HotThing">
                <button className="text-xl text-gray-800 p-2">熱銷商品</button>
              </Link>
            </div>

            {/* 所有商品 */}
            <div className="relative group">
              <Link to="/AllProducts">
                <button className="text-xl text-gray-800 p-2 flex items-center space-x-1">
                  <span>所有商品</span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-800" />
                </button>
              </Link>
              <div className="absolute bg-white border border-gray-300 rounded-md w-48 z-10 opacity-0 group-hover:opacity-100 duration-300 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  to="/Clothes"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  上衣
                </Link>
                <Link
                  to="/Pants"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  褲子
                </Link>
                <Link
                  to="/Skirt"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  裙子
                </Link>
                <Link
                  to="/Dress"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  洋裝
                </Link>
                <Link
                  to="/Coat"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  外套
                </Link>
              </div>
            </div>

            {/* 飾品 */}
            <div className="relative group">
              <Link to="/Accessories">
                <button className="text-xl text-gray-800 p-2 flex items-center space-x-1">
                  <span>飾品</span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-800" />
                </button>
              </Link>
              <div className="absolute bg-white border border-gray-300 rounded-md w-48 z-10 opacity-0 group-hover:opacity-100 duration-300 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  to="/Earring"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  耳環
                </Link>
                <Link
                  to="/Necklace"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  項鍊
                </Link>
                <Link
                  to="/Ring"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  戒指
                </Link>
              </div>
            </div>

            {/* 隱私政策 */}
            <div>
              <Link to="/Privacy">
                <button className="text-xl text-gray-800 p-2">隱私政策</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div></div>
  );
}

export default NavColumn;
