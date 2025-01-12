import { FaArrowLeft, FaCartShopping } from "react-icons/fa6";
import useCartContext from "../../context/CartContext";
import { Button, Image, Input, Loading, Select } from "../../components";
import { FaTrashAlt } from "react-icons/fa";
import CartItem from "../../components/user/Orders/CartItem";
import { useState } from "react";
import { makeOrder } from "../../api/order";
import { Link } from "react-router-dom";

const options = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "D4",
];

function Orders() {
  const { cartItems, getCartTotal } = useCartContext();
  const [note, setNote] = useState("");
  const [orderType, setOrderType] = useState("Delivery");
  const [table_no, setTableNo] = useState("A1");
  const [loading, setLoading] = useState(false)

  if (!cartItems.length)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <FaCartShopping className="text-[160px] lg:text-[280px]" />
        <h1 className="roboto-bold ml-5 mt-6 text-3xl">No Orders Yet!</h1>
      </div>
    );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true)
    const orderItems = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
    const data = {
      table_no,
      orderType,
      note,
      orderItems,
    };
    makeOrder(data)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>setLoading(false))
      
  }

  return (
    <div className="flex flex-col">
      <Link to="/" >
        <div className="mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium ">
          <FaArrowLeft />
          <p>Back</p>
        </div>
      </Link>
      <div className="mb-3 mt-4 flex w-full items-center justify-center text-4xl">
        <FaCartShopping className="text-4xl" />
        <h1 className="montserrat-title ml-3 text-center">Cart</h1>
      </div>
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div
            key={item._id}
            className="group mt-5 flex border-spacing-2 items-center justify-between border border-l-0 border-r-0 border-dashed border-white border-b-white border-t-white border-opacity-35 px-4 py-5"
          >
            <CartItem {...item} />
          </div>
        ))}
      <div className="mr-4 flex justify-end">
        <p className="roboto-bold mt-7 text-2xl">
          Total: <span className="text-green-600">${getCartTotal()}</span>{" "}
        </p>
      </div>
      <div className="divider">Select your payment methods</div>
      <div className="p-5">
        <Select
          name="table_no"
          value={table_no}
          onChange={(e) => setTableNo(e.currentTarget.value)}
          options={options}
          className="rounded-3xl indent-2"
        >
          Table No
        </Select>
        <Select
          name="orderType"
          value={orderType}
          onChange={(e) => setOrderType(e.currentTarget.value)}
          options={["Delivery", "Take Away", "Dine-In"]}
          className="mt-5 rounded-3xl indent-2"
        />
        <Input
          name="note"
          placeholder="Note"
          value={note}
          inputStyles="w-full mt-5 rounded-3xl indent-2"
          onChange={(e) => setNote(e.currentTarget.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          className="green-submit-button bottom-5 mb-6 mt-6 w-full"
        >
          Check Out
        </Button>
      </form>
      {loading && <Loading />}
    </div>
  );
}

export default Orders;
