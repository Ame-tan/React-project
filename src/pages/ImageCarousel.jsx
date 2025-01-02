import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

const imgtop = [image1, image2, image3];

function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 不顯示左右箭頭
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false, // 滑鼠懸停在輪播圖上不會暫停播放
    draggable: true,
    appendDots: (dots) => (
      <div className="carousel-dots">
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {imgtop.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
