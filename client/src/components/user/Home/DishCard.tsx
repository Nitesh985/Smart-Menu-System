import { useEffect, useState } from "react";
import { Button, Image } from "../../";
import useCartContext from "../../../context/CartContext";
import { FaHeart, FaHeartBroken, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [favorite, setFavorite] = useState(false);

  const handleCartAdd = () => {
    setQuantity(1);
    addToCart({ _id, name, image, price, quantity: 1 });
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
    <div className="group mb-10 border-5">
      {/* <div
        onClick={() => setFavorite((prevState) => !prevState)}
        className="absolute z-10 ml-36 mt-4 flex cursor-pointer btn-ghost items-center justify-center rounded-full bg-opacity-70 text-4xl text-red-500"
      >
        {favorite ? <FaHeart /> : <FaRegHeart className="bg-neutral bg-opacity-55 rounded-full text-white opacity-50" />}
      </div> */}
      {image && <Link to={`/d/${_id}`}>
        <Image imageUrl={image.url} className="w-48 rounded-md" />
      </Link>}
      <div className="flex flex-col items-center p-1">
        <h1 className="text-2xl font-bold">{name}</h1>
        <h2 className="text-center text-xl font-semibold text-green-600">
          ${price}
        </h2>
        {quantity ? (
          <div className="mt-3 flex w-full items-center justify-between p-4 text-white">
            <Button className="sub-button" onClick={subQuantity}>
              -
            </Button>
            <p className="text-2xl font-bold text-gray-700">{quantity}</p>
            <Button className="add-button" onClick={addQuantity}>
              +
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
