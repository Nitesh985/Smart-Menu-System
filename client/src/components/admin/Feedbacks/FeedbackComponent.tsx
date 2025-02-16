import React from "react";
import { CgProfile } from "react-icons/cg";
import { Star } from "../..";

function FeedbackComponent({...feedback}) {
  return (
    <div key={feedback._id} className="border p-4 w-full flex space-x-16">
      <CgProfile size={60} />
      <div>
        <Star value={feedback.rating} />
        <h4 className="font-bold">{feedback.user.username}</h4>
        <p>{feedback.message}</p>
      </div>
    </div>
  );
}

export default FeedbackComponent;
