import { FaArrowLeft, FaCartShopping } from "react-icons/fa6";
import useCartContext from "../../../context/CartContext";
import { Loading } from "../../../components";
import CartItem from "../../../components/user/Orders/CartItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { updateOrder } from "../../../api/order";

interface OrderFormProps {
  tableNumberDisplay: string;
  cartTotal: number;
  onSubmit: (note: string) => void;
  // Edit mode (optional — used when editing an existing order)
  isEditing?: boolean;
  orderId?: string;
}

function OrderForm({
  tableNumberDisplay,
  cartTotal,
  onSubmit,
  isEditing = false,
  orderId,
}: OrderFormProps) {
  const { cartItems, clearCart } = useCartContext();
  const [note, setNote] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(note);
  };

  const handleEditCancellation = () => {
    if (!orderId) return;
    setCancelling(true);
    updateOrder(orderId, { isEditing: false })
      .then(() => {
        clearCart();
        navigate("/");
      })
      .finally(() => setCancelling(false));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          {isEditing ? (
            <button
              onClick={handleEditCancellation}
              disabled={cancelling}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <RxCrossCircled className="text-base" />
              Cancel edit
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </Link>
          )}

          <div className="flex items-center gap-2">
            <FaCartShopping className="text-green-600" />
            <span className="text-sm font-semibold text-gray-700">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          <span className="text-sm font-bold text-green-600">₹{cartTotal}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 flex flex-col gap-4">

        {/* Cart items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Your items
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {cartItems.map((item) => (
              <div key={item._id} className="px-4 py-3">
                <CartItem {...item} />
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="px-4 pb-4 pt-2">
              <Link to="/">
                <button className="w-full py-2.5 rounded-xl border border-dashed border-green-300 text-green-600 text-sm font-medium hover:bg-green-50 transition-colors">
                  + Add more dishes
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Order total</span>
          <span className="text-xl font-bold text-gray-800">₹{cartTotal}</span>
        </div>

        {/* Order details + submit */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Order details
            </h2>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Table — read-only, resolved by PlaceOrder */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Table</span>
              <span className="text-sm font-bold text-green-600">
                {tableNumberDisplay}
              </span>
            </div>

            {/* Note */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Note{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special requests?"
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-green-400 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="px-5 pb-5">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold text-sm transition-colors"
            >
              {isEditing ? "Update order" : "Place order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;