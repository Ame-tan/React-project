import React from "react";
import useSWR from "swr";
import axios from "axios";
import ImageCarousel from "./ImageCarousel";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function MidPage() {
  const { data, error } = useSWR("http://localhost:4000/Images", fetcher);

  console.log("Data:", data);
  console.log("Error:", error);

  const images = data || [];

  if (error) return <div>Failed to load: {error.message}</div>;

  const homeImages = images.filter((h) => h.category !== "飾品");

  return (
    <>
      <div className="Container bg-white w-full max-h-1000px p-4 flex items-center justify-center">
        <ImageCarousel />
      </div>

      <div className="Container2 bg-white w-full h-screen p-11 flex flex-col items-center">

        <div className="bg-orange-200 bg-opacity-60 w-4/6 h-24 max-h-24 flex flex-col justify-center text-amber-950 text-xl p-8 shadow-xl border-4 border-orange-100">
          <span className="font-bold">所有商品</span>
          <span className="font-light">All products</span>
        </div>


        <div className="flex w-full h-full mt-20 justify-center">
          <div className="grid grid-cols-4 gap-20 ">
            {homeImages.map((h) => (
              <div
                key={h.id}
                className="bg-white cursor-pointer relative w-full h-full max-h-60 max-w-60  mb-10"
              >
                <div className="relative group  ">
                  <button>
                    <img src={h.image} alt={h.description} />
                  </button>
                  
                  <div className="absolute bottom-1 left-0 h-10 w-full flex items-center justify-center text-xl text-white bg-slate-600 bg-opacity-70 opacity-0 group-hover:opacity-100 z-10">
                    加入購物車
                  </div>
                </div>


                <div className="relative group  ">

                  <div className=" flex-wrap flex text-left text-lg font-bold text-gray-500 bg-opacity-70 group-hover:text-gray-950">
                    {h.description}
                  </div>
                  
                  <div className="flex text-left text-lg font-bold text-gray-500">
                    {h.money}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </>
  );
}

export default MidPage;
