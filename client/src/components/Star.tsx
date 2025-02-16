import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

function Star({ value }: { value: number }) {
    

  return <div className="flex" >
    {[...Array(5)].map((_, index) =><FaStar key={index} color={index<value?"gold":"gray"}  />
    )}
  </div>
}

export default Star;
