import useOrderContext from "../../context/OrderContext";
import { HiShoppingCart } from "react-icons/hi";
import useCartContext from "../../context/CartContext";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Footer() {
  const { orderEditingMode, orderId } = useOrderContext();
  const { getNoOfItems } = useCartContext();
  const total = getNoOfItems()
  const navigate = useNavigate()

  const handleClick = () => {
    if (orderEditingMode){
      navigate(`/edit-order/o/${orderId}`)
      return
    }
    if (total){
      navigate(`/place-order`)
      return
    }
    navigate(`/my-order`)

  }


  if (!total && !orderEditingMode && !orderId) return null;

  return (
    <footer>
          <div className={`scale-95 hover:scale-100 transition-transform duration-500 ease-in-out bg-[#3D3D3D] w-full fixed bottom-1 py-4 rounded-t-full text-white flex justify-center text-xl gap-2`} onClick={handleClick} >
              <div className="flex gap-3">
                {!total?<IoFastFood size={27} />:<HiShoppingCart size={27} />}
                <span className="font-bold">{!total?"My Orders":"Go To Cart"}</span>
              </div>
          </div>
    </footer>
  );
}
