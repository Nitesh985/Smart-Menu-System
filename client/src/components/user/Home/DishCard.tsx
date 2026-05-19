import { useEffect, useState } from "react";
import { Button, Image } from "../../";
import useCartContext from "../../../context/CartContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useSearchContext from "../../../context/SearchContext";
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
  stock?: number;
}

const HighlightQuery = ({ query, word }: { query: string; word: string }) => {
  if (!query || !word.includes(query)) return <span>{word}</span>;
  return (
    <span>
      {word.split(query).map((part, index) => (
        <span key={index}>
          {part}
          {index < word.split(query).length - 1 && (
            <span className="text-green-500">{query}</span>
          )}
        </span>
      ))}
    </span>
  );
};

function DishCard({ _id, name, image, price, stock, description }: DishProps) {
  const { addToCart, editCartItem, getDishQuantity, removeFromCart } = useCartContext();
  const { searchedQuery } = useSearchContext();
  const [quantity, setQuantity] = useState<number>(getDishQuantity(_id) || 0);
  const [favorite, setFavorite] = useState(false);

  const handleCartAdd = () => {
    setQuantity(1);
    addToCart({ _id, name, image, price, quantity: 1 });
  };

  const addQuantity = () => {
    setQuantity((prev) => {
      if (stock === 0) return prev;
      return stock ? Math.min(stock, prev + 1) : prev + 1;
    });
  };

  const subQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    editCartItem({ _id, quantity });
    if (!quantity) removeFromCart(_id);
  }, [quantity, _id]);

  return (
    <div className="group flex flex-col rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/d/${_id}`}>
          {image && (
            <img
              src={image.url}
              alt={name}
              className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>
        {/* Favorite button */}
        <button
          onClick={() => setFavorite((prev) => !prev)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 text-red-500 shadow hover:scale-110 transition-transform"
        >
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        {/* Out of stock badge */}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        <h1 className="text-base font-bold text-gray-800 truncate leading-tight">
          <HighlightQuery query={searchedQuery} word={name} />
        </h1>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-lg font-bold text-green-600">₹{price}</span>

          {quantity ? (
            <div className="flex items-center gap-3">
              <Button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-lg transition-colors"
                onClick={subQuantity}
              >
                −
              </Button>
              <span className="text-base font-bold text-gray-800 w-4 text-center">{quantity}</span>
              <Button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg transition-colors"
                onClick={addQuantity}
              >
                +
              </Button>
            </div>
          ) : (
            <button
              onClick={handleCartAdd}
              disabled={stock === 0}
              className="rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 transition-colors"
            >
              Order Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DishCard;