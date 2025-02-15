import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useCartContext from "../../../context/CartContext";
import { Button, Image } from "../..";

function CartItem({ ...item }) {
  const { editCartItem, getDishQuantity, removeFromCart } = useCartContext();
  const [quantity, setQuantity] = useState<number>(
    getDishQuantity(item._id) || 0,
  );

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const subQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  useEffect(() => {
    editCartItem({ _id: item._id, quantity });
  }, [quantity]);
  return (
    <>
      <Image imageUrl={item?.image?.url} />
      <h2 className="font-bold w-[100px] lg:w-[250px] text-center"><span className="mr-1" >{item.name}</span> (<span className="text-green-600" >Rs.{item.price}</span>) </h2>

        <Button className="sub-button" onClick={subQuantity}>-</Button>
        <p>{item.quantity}</p>
        <Button className="add-button" onClick={addQuantity}>+</Button>
      <Button
        className="cursor-pointer hover:text-red-600 hover:bg-white text-red-500 bg-red-500 rounded-full bg-opacity-10 border-none"
        onClick={() => removeFromCart(item._id)}
      >
        <FaTrashAlt
          className="text-md "

        />
      </Button>
    </>
  );
}

export default CartItem;
