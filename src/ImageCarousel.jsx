import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';
import image4 from './image4.jpg';




const imgtop = [image1, image2 , image3 ,image4 ];


function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 4000,    // Set the delay to 4 seconds (4000 milliseconds)
    pauseOnHover: true,     // Pause autoplay on hover
    draggable: true,        // Allow dragging
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {imgtop.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
