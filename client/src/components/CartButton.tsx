import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineMoped } from "react-icons/md"; 
import { useNavigate } from "react-router-dom";
import useCartContext from "../context/CartContext";

function CartButton() {
  const { getNoOfItems, hasActiveOrder } = useCartContext();
  const navigate = useNavigate();
  const totalItems = getNoOfItems();

  // Condition 3: If cart is empty AND there is no pending active order, hide completely
  const shouldShow = totalItems > 0 || hasActiveOrder;
  if (!shouldShow) return null;

  let label = "";
  let targetRoute = "";
  let Icon = FaCartShopping;

  // Condition 1: Items are in the cart (Takes priority)
  if (totalItems > 0) {
    label = "Go To Cart";
    targetRoute = "/place-order";
    Icon = FaCartShopping;
  } 
  // Condition 2: Cart is empty but user is waiting on a placed order
  else if (hasActiveOrder) {
    label = "My Orders";
    targetRoute = "/my-order";
    Icon = MdOutlineMoped; // Using a delivery icon for clarity
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => navigate(targetRoute)}
        className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-full shadow-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
      >
        <div className="relative flex items-center justify-center">
          <Icon className="text-xl" />
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-orange-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-green-600">
              {totalItems}
            </span>
          )}
        </div>
        <span>{label}</span>
      </button>
    </div>
  );
}

export default CartButton;