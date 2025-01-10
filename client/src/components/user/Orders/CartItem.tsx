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
      <h2 className="font-bold w-[100px] lg:w-[250px] text-center">{item.name}</h2>
        <Button className="add-button" onClick={addQuantity}>+</Button>
        <p>{item.quantity}</p>
        <Button className="sub-button" onClick={subQuantity}>-</Button>
      <Button
        className="cursor-pointer hover:text-red-600 bg-slate-500 rounded-full bg-opacity-10 border-none"
        onClick={() => removeFromCart(item._id)}
      >
        <FaTrashAlt
          className="text-md"
        />
      </Button>
    </>
  );
}

export default CartItem;
