import { useEffect, useState } from "react";
import { Button, Card, Loader, SelectOptions } from "../..";
import OrderItem from "./OrderItem";
import { getOrders } from "../../../api/order";
import { OrderItemProps } from "./OrderItem";
import { Link } from "react-router-dom";
import { TbRefresh } from "react-icons/tb";
import { socket } from "../../../App";

const options = ["All", "Dine-In", "Take-Away", "Delivery"]

function OrderList() {
  const [userOrders, setUserOrders] = useState<OrderItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersUpdated, setOrdersUpdated] = useState(false)

  const fetchOrders = () => {
    setLoading(true);
    getOrders("status=PENDING")
      .then((res) => {
        setUserOrders(res.data);
      })
      .finally(() => setLoading(false));
  }

  // useEffect(() => {
  //   fetchOrders()
  // }, [ordersUpdated]);

  useEffect(()=>{
    socket.on("reception", (orders)=>{
      setUserOrders(orders)
    })
  }, [])

  return (
    <>
      <div className="mt-3 flex justify-center">
        <h1 className="font-bold text-2xl" >Orders List</h1>
      </div>
      <Button onClick={fetchOrders}><TbRefresh /></Button>
      <div className="bg-primary-100 flex w-full cursor-pointer flex-wrap items-center justify-between p-7">
        {userOrders.map((order) => (
              <OrderItem key={order._id} {...order} setOrdersUpdated={setOrdersUpdated} />
          ))}
        {loading && (
          <div className="mt-9 flex h-[300px] w-[300px] animate-pulse items-center justify-center rounded-3xl border bg-orange-500">
            <div className="absolute mr-5 mt-5 h-[300px] w-[300px] rounded-3xl bg-orange-400">
              <div className="mx-auto my-4 h-8 w-[60px] rounded bg-gray-300"></div>
              <div className="ml-6 p-6">
                <div className="my-2 h-6 w-3/4 rounded bg-gray-300"></div>
                <div className="my-2 h-6 w-3/4 rounded bg-gray-300"></div>
                <div className="my-2 h-6 w-3/4 rounded bg-gray-300"></div>
                <div className="my-2 h-6 w-3/4 rounded bg-gray-300"></div>
              </div>
              <div className="flex justify-between gap-2 self-end px-9">
                <div className="h-7 w-[100px] rounded-3xl bg-gray-300 py-5"></div>
                <div className="h-7 w-[100px] rounded-3xl bg-gray-300 py-5"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;
