import React from "react";


interface Carousel{
  images?:string[];
}

function Carousel({images=[]}:Carousel) {
  return (
    <div className="carousel w-full lg:h-[500px] h-56">
      {images.map((image, index) => (
      <div key={index} id={index.toString()} className="carousel-item w-full">
        <img
          src={image}
          className="w-full"
        />
      </div>
      ))}
      
    </div>
  );
}

export default Carousel;
