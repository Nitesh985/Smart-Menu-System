import { useEffect, useState } from "react";
import { Button, Image } from "../../";
import useCartContext from "../../../context/CartContext";

export interface DishProps {
  _id: string;
  name: string;
  price: number;
  image: {
    url: string;
    public_id: string;
  };
  description: string;
}

function DishCard({ _id, name, image, price }: DishProps) {
  const { addToCart, editCartItem, getDishQuantity } = useCartContext();
  const [quantity, setQuantity] = useState<number>(getDishQuantity(_id) || 0);

  const handleCartAdd = () => {
    setQuantity(1);
    addToCart({ _id, name, image, price, quantity:1 });
  };

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const subQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  useEffect(() => {
    editCartItem({ _id, quantity });
  }, [quantity]);

  return (
    <div className="group mb-10">
      {image && <Image imageUrl={image.url} className="w-48 rounded-md" />}
      <div className="flex flex-col items-center p-5">
        <h1 className="text-2xl font-bold">{name}</h1>
        <h2 className="text-xl text-green-600 font-semibold text-center" >${price}</h2>
        {quantity ? (
          <div className="mt-3 p-1 flex w-full items-center justify-between text-white">
            <Button
              className="add-button"
              onClick={addQuantity}
            >
              +
            </Button>
            <p className="text-2xl">{quantity}</p>
            <Button
              className="sub-button"
              onClick={subQuantity}
            >
              -
            </Button>
          </div>
        ) : (
          <button
            onClick={handleCartAdd}
            className="mt-4 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500"
            // "transition-transform transform duration-300 ease-in-out group-hover:transform group-hover:translate-y-10 "
          >
            Order Now
          </button>
        )}
      </div>
    </div>
  );
}

export default DishCard;
