import { FaArrowLeft, FaCartShopping } from "react-icons/fa6";
import useCartContext from "../../context/CartContext";
import { Loading, Modal } from "../../components";
import OrderForm from "../../components/user/OrderForm";
import { useEffect, useState } from "react";
import { makeOrder } from "../../api/order";
import { Link, useNavigate } from "react-router-dom";
import { getAllTables } from "../../api/table";
import useTableContext from "../../context/TableContext";
import { SignUpForm } from "../../components";
import { useAppSelector } from "../../store/hooks";
import { socket } from "../../App";

type BackendTableType = {
  _id: string;
  table_no: string;
};

function Orders() {
  const { cartItems, getCartTotal, clearCart } = useCartContext();
  const { tableId } = useTableContext();
  const [tableNumberDisplay, setTableNumberDisplay] = useState<string>("Loading...");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useAppSelector((state) => state.auth.status);
  const token = useAppSelector((state) => state.auth.token);

  // Resolve human-readable table label from tableId
  useEffect(() => {
    if (!tableId) {
      setTableNumberDisplay("No session found!");
      return;
    }
    getAllTables()
      .then((res) => {
        const match = res.data.find((t: BackendTableType) => t._id === tableId);
        setTableNumberDisplay(match ? match.table_no : "Unknown table");
      })
      .catch(() => setTableNumberDisplay("Error fetching table"));
  }, [tableId]);

  const handleSubmit = (note: string) => {
    if (!authStatus) {
      setIsOpen(true);
      return;
    }
    placeOrder(token, note);
  };

  const placeOrder = (activeAuthToken: string | null, note: string) => {
    const orderItems = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));

    setLoading(true);
    makeOrder({ tableId, orderItems, token: activeAuthToken, note })
      .then((res) => {
        if (res.statusCode === 201 && res.success) {
          alert("The order was successfully placed!");
          socket.emit("order-placed", res.data._id);
          clearCart();
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Failed to place order.");
      })
      .finally(() => setLoading(false));
  };

  // ── Empty cart ──
  if (!cartItems.length)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="p-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back to menu
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 gap-5">
          <div className="w-28 h-28 rounded-full bg-green-50 flex items-center justify-center">
            <FaCartShopping className="text-5xl text-orange-300" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
            <p className="text-sm text-gray-400 mt-1">
              Looks like you haven't added anything yet
            </p>
          </div>
          <Link
            to="/"
            className="mt-1 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Browse menu
          </Link>
        </div>
      </div>
    );

  // ── Order form ──
  return (
    <>
      <OrderForm
        tableNumberDisplay={tableNumberDisplay}
        cartTotal={getCartTotal()}
        onSubmit={handleSubmit}
      />

      <Modal
        title="Sign in to place order"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SignUpForm
          tableId={tableId}
          onSuccess={(freshToken) => {
            setIsOpen(false);
            // note state lives in OrderForm — re-trigger via a stored ref if needed
            placeOrder(freshToken, "");
          }}
        />
      </Modal>

      {loading && <Loading />}
    </>
  );
}

export default Orders;