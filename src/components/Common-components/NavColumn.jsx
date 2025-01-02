import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function NavColumn() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);

  const toggleInfoMenu = () => {
    setIsInfoOpen((prev) => !prev);
  };
  const toggleProductMenu = () => {
    setIsProductOpen((prev) => !prev);
  };
  const toggleAccessoriesMenu = () => {
    setIsAccessoriesOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)"); // 判斷螢幕寬度
    const handleResize = () => {
      //  md 以上尺寸，關閉導覽列(及md以下已開啟的導覽列變成false)
      if (mediaQuery.matches) {
        setIsOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="navcolumn-container  bg-red-50 ">
      {/* 三條線按鈕和遮罩 */}
      <div className="flex justify-start items-start sm:px-2  md:hidden ">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </div>
        </button>
      </div>

      {/* 三條線和遮罩 */}
      <div
        className={` fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
        onClick={toggleMenu}
      ></div>
      <div
        className={` w-2/4 fixed top-0 left-0 h-full bg-slate-400 z-50 
                    transform transition-transform duration-300 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex  flex-col  w-full">
          <div className="flex items-center justify-between border-b border-black p-2">
            <Link
              to="/Information"
              className="text-xl text-white px-2 py-2 w-full"
            >
              資訊
            </Link>

            <button
              onClick={toggleInfoMenu}
              className="p-2 flex items-center justify-center"
            >
              <ChevronDownIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {isInfoOpen && (
            <div className="bg-slate-200 w-full z-10">
              <Link
                to="/ProductInformation"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                商品資訊
              </Link>
              <Link
                to="/PayAndTo"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                付款&配送說明
              </Link>
              <Link
                to="/Question"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                常見問題
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-black p-4">
            <Link to="/HotThing" className="text-xl text-white w-full">
              熱銷商品
            </Link>
          </div>
          <div className="flex items-center justify-between border-b border-black p-2">
            <Link
              to="/Information"
              className="text-xl text-white px-2 py-2 w-full"
            >
              所有商品
            </Link>

            <button
              onClick={toggleProductMenu}
              className="p-2 flex items-center justify-center"
            >
              <ChevronDownIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {isProductOpen && (
            <div className="bg-slate-200 w-full z-10">
              <Link
                to="/Clothes"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                上衣
              </Link>
              <Link
                to="/Pants"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                褲子
              </Link>
              <Link
                to="/Skirt"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                裙子
              </Link>
              <Link
                to="/Dress"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                洋裝
              </Link>
              <Link
                to="/Coat"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                外套
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-black p-2">
            <Link
              to="/Accessories"
              className="text-xl text-white px-2 py-2 w-full"
            >
              飾品
            </Link>

            <button
              onClick={toggleAccessoriesMenu}
              className="p-2 flex items-center justify-center"
            >
              <ChevronDownIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {isAccessoriesOpen && (
            <div className="bg-slate-200 w-full z-10">
              <Link
                to="/Earring"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                耳環
              </Link>
              <Link
                to="/Necklace"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                項鍊
              </Link>
              <Link
                to="/Ring"
                className="block px-4 py-2 text-gray-800 border-b border-white text-center"
              >
                戒指
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-black p-4">
            <Link to="/Privacy" className="text-xl text-white w-full">
              隱私政策
            </Link>
          </div>
        </div>
      </div>

      {/* md(768px)尺寸以上的畫面 */}
      <nav className="hidden md:flex md:justify-center md:items-center bg-red w-full border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="md:flex md:space-x-10 w-auto grid grid-cols-5 gap-x-4 gap-y-4 mt-4 md:mt-0">
          <div className="relative group">
            <Link to="/Information">
              <button className="text-xl text-gray-800 p-2 flex items-center">
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

          <div>
            <Link to="/HotThing">
              <button className="text-xl text-gray-800 p-2">熱銷商品</button>
            </Link>
          </div>

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

          <div>
            <Link to="/Privacy">
              <button className="text-xl text-gray-800 p-2">隱私政策</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavColumn;
