import { FaCartShopping } from "react-icons/fa6";
import {Button} from ".";
import useCartContext from "../context/CartContext";

function CartButton() {
  const {getNoOfItems} = useCartContext()
  const total = getNoOfItems()

  return (
    <div className="fixed bottom-3 right-3 group">
          {total!==0 &&  <div className="relative left-8 top-3" >
            <p className="bg-orange-600 w-6 h-6 flex items-center justify-center rounded-full group-hover:bg-orange-700" >{total}</p>
          </div>}
          <Button className="bg-bgColor-500 rounded-full text-xl group-hover:bg-green-700">
            <FaCartShopping />
          </Button>
    </div>
  );
}

export default CartButton;
