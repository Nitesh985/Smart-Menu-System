import { useEffect, useState } from "react"
import { getOrders } from "../../../api/order"
import { OrderItemProps } from './OrderItem';
import OrderDetailItem from "./OrderDetailItem";

function OrderDetails() {
  const [orders, setOrders] = useState<OrderItemProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    getOrders()
    .then(res=>{
      setOrders(res.data)
    })
    .finally(()=>setLoading(false))
  }, [])


  return (
    <div className="mt-10" >
      {orders.length>0 && orders.map(order=>(
        <OrderDetailItem key={order._id} {...order} />
      ))}
    </div>
  )
}

export default OrderDetails