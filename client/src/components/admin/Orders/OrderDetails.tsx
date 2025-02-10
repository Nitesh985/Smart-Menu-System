import { useEffect, useState } from "react"
import { getOrders, getOrdersByType } from "../../../api/order"
import { OrderItemProps } from './OrderItem';
import OrderDetailItem from "./OrderDetailItem";
import { Loading, SelectOptions } from "../..";

const options = ["All", "Dine-In", "Take-Away", "Delivery"]

function OrderDetails() {
  const [orders, setOrders] = useState<OrderItemProps[]>([])
  const [selectedType, setSelectedType] = useState("All")
  const [loading, setLoading] = useState(false)
  const [ordersUpdated, setOrdersUpdated] = useState(false)

  useEffect(()=>{
    setLoading(true);
    (selectedType==="All"?getOrders():getOrdersByType(selectedType))
    .then(res=>{
      setOrders(res.data)
    })
    .finally(()=>setLoading(false))
  }, [ordersUpdated, selectedType])

  console.log(orders)



  return (
    <>
      <div className="mt-3 flex justify-center">
        <SelectOptions
          className="flex bg-black"
          optionStyles="bg-black text-white"
          options={options}
          onChange={(e)=>{setSelectedType(e.currentTarget.value)}}
        />
      </div>
      <div className="mt-10 " >
        {orders.length>0 && orders.map(order=>(
          <OrderDetailItem key={order._id} {...order} setOrdersUpdated={setOrdersUpdated} />
        ))}
        {loading && 
        <div className="flex w-full items-center justify-center animate-pulse">
        <div className="mb-10 flex w-[56%] flex-col items-center justify-center gap-3 rounded-lg border-2 border-gray-400 px-2 py-9">
          <div className="flex w-11/12 items-center justify-center gap-1 border border-gray-400 text-2xl text-orange-500">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex max-h-full w-11/12 flex-col gap-2">
            <div className="flex justify-between border border-gray-400 p-3">
              <div className="flex gap-3">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="flex w-11/12 items-center justify-end border border-gray-400 p-2">
            <div className="text-3xl h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="mt-3 flex w-11/12 justify-between px-6 py-2">
            <div className="px-8 h-10 w-24 bg-gray-200 rounded"></div>
            <div className="px-8 h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>}
      </div>
    </>
  )
}

export default OrderDetails