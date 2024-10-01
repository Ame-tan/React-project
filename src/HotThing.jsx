import React from "react";
import TopAll from "./TopAll";
import useSWR from "swr";
import axios from "axios";


const fetcher = (url) => axios.get(url).then((res) => res.data);


function HotThing() {

    const { data, error } = useSWR("http://localhost:4000/Images", fetcher);

    console.log("Data:", data);
    console.log("Error:", error);
  
    const images = data || [];
  
    if (error) return <div>Failed to load: {error.message}</div>;

    //只保留符合 "popular: true" 的項目
    const popularImages = images.filter((p) => p.popular === "true");

  return (
    <>
      <TopAll />

      <div className="Container2 bg-white w-full h-screen p-11 flex flex-col items-center">
        <div className="w-4/6 h-0 flex justify-start text-amber-950 text-xl ">
          <span className="font-black">熱銷商品</span>
        </div>

        <div className="flex w-full h-full mt-20 justify-center">
          <div className="grid grid-cols-4 gap-20 ">
            {popularImages.map((p) => (
              <div
                key={p.id}
                className="bg-white cursor-pointer relative w-full h-full max-h-60 max-w-60  mb-10"
              >
                <div className="relative group  ">
                  <button>
                    <img src={p.image} alt={p.description} />
                  </button>

                  <div className="absolute bottom-1 left-0 h-10 w-full flex items-center justify-center text-xl text-white bg-slate-600 bg-opacity-70 opacity-0 group-hover:opacity-100 z-10">
                    加入購物車
                  </div>
                </div>

                <div className="relative group  ">
                  <div className=" flex-wrap flex text-left text-lg font-bold text-gray-500 bg-opacity-70 group-hover:text-gray-950">
                    {p.description}
                  </div>

                  <div className="flex text-left text-lg font-bold text-gray-500">
                    {p.money}
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

export default HotThing;
