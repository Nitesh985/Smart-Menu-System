import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useCartContext from "../../../context/CartContext";

function CartItem({ ...item }) {
  const { editCartItem, getDishQuantity, removeFromCart } = useCartContext();
  const [quantity, setQuantity] = useState<number>(getDishQuantity(item._id) || 0);

  const addQuantity = () => setQuantity((prev) => prev + 1);
  const subQuantity = () => setQuantity((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    editCartItem({ _id: item._id, quantity });
  }, [quantity]);

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Image */}
      <img
        src={item?.image?.url}
        alt={item.name}
        className="w-14 h-14 rounded-xl object-cover shrink-0"
      />

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
        <p className="text-sm font-bold text-green-600 mt-0.5">₹{item.price}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={subQuantity}
          className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 font-bold text-base flex items-center justify-center transition-colors"
        >
          −
        </button>
        <span className="text-sm font-bold text-gray-700 w-4 text-center">
          {quantity}
        </span>
        <button
          onClick={addQuantity}
          className="w-7 h-7 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-base flex items-center justify-center transition-colors"
        >
          +
        </button>
      </div>

      {/* Delete */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="w-7 h-7 rounded-full flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
      >
        <FaTrashAlt className="text-xs" />
      </button>
    </div>
  );
}

export default CartItem;