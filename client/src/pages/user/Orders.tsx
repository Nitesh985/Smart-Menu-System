import { FaCartShopping } from "react-icons/fa6";
import useCartContext from "../../context/CartContext";
import { Button, Image, Input, Select } from "../../components";
import { FaTrashAlt } from "react-icons/fa";
import CartItem from "../../components/user/Orders/CartItem";
import { useState } from "react";
import { makeOrder } from "../../api/order";

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
  const [tip, setTip] = useState("");
  const [type, setType] = useState(null);
  const [table_no, setTableNo] = useState(null);

  if (!cartItems.length)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <FaCartShopping className="text-[160px] lg:text-[280px]" />
        <h1 className="roboto-bold ml-5 mt-6 text-3xl">No Orders Yet!</h1>
      </div>
    );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const dishes = cartItems.map(item=>({_id:item._id, quantity:item.quantity, price:item.price}))
      const data = {
        table_no,
        orderType: type,
        note: tip,
        orderItems: dishes
      } 
      makeOrder(data)
      .then(res=>
        console.log(res.data)
      )
      .then(error=>{
        console.log(error)
      })

  }

  return (
    <div className="flex flex-col">
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
          name="type"
          value={type}
          onChange={(e)=>setType(e.currentTarget.value)}
          options={["Delivery", "Take Away", "Dine-In"]}
          className="mt-5 rounded-3xl indent-2"
        />
        <Input
          name="tip"
          placeholder="Tips"
          value={tip}
          inputStyles="w-full mt-5 rounded-3xl indent-2"
          onChange={(e) => setTip(e.currentTarget.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Button type="submit" className="green-submit-button mt-6 mb-6 bottom-5 w-full">
          Check Out
        </Button>
      </form>
    </div>
  );
}

export default Orders;
