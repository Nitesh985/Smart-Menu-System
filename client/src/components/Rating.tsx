import React from "react";

function Rating({value}:{value:number}) {
    

    return (
    <div className="rating rating-lg rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      {value>=0.5 &&
        <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        />
      }
      {value>=1 &&
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        />
    }
    {value>=1.5 &&
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        />
        
    }
    {value>=2 &&
    <input
      type="radio"
      name="rating-10"
      className="mask mask-star-2 mask-half-2 bg-green-500"
      />
      
    }
    {value>=2.5 &&
    <input
      type="radio"
      name="rating-10"
      className="mask mask-star-2 mask-half-1 bg-green-500"
      />
      
    }
    {value>=3 &&
    <input
      type="radio"
      name="rating-10"
      className="mask mask-star-2 mask-half-2 bg-green-500"
    />
      
    }
    {value>=3.5 &&
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
      />
      
    }
    {value>=4 && 
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
      />
    }
    {value>=4.5 &&
      
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
      />
    }
      {value>=5 && <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
      />}
    </div>
  );
}

export default Rating;
