import { useState } from "react";

function GiveReview({name="rating", handleChange}:{name:string, handleChange:()=>void}) {
  
    return (
    <div className="rating rating-lg rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-1 bg-green-500"
        value={0.5}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-2 bg-green-500"
        onChange={handleChange}
        value={1}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-1 bg-green-500"
        onChange={handleChange}
        value={1.5}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-2 bg-green-500"
        onChange={handleChange}
        value={2}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-1 bg-green-500"
        onChange={handleChange}
        value={2.5}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-2 bg-green-500"
        value={3}
        onChange={handleChange}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-1 bg-green-500"
        onChange={handleChange}
        value={3.5}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-2 bg-green-500"
        onChange={handleChange}
        value={4}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-1 bg-green-500"
        onChange={handleChange}
        value={4.5}
      />
      <input
        type="radio"
        name={name}
        className="mask mask-star-2 mask-half-2 bg-green-500"
        onChange={handleChange}
        value={5}
      />
    </div>
  );
}

export default GiveReview;
