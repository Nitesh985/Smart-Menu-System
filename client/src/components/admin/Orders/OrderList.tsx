import { useEffect, useState } from 'react';
import { Card, Loader } from '../..';
import OrderItem from './OrderItem';
import { getOrders } from '../../../api/order';
import { OrderItemProps } from './OrderItem';


const orders = [
  { id: 1, table_no: 'A1', total: 100, type:"Dine-In", tip:"Please add some salt on it" },
  { id: 2, table_no: 'B4', total: 600, type:"Delivery", tip:"Please add some pepper on it" },
  { id: 3, table_no: 'A3', total: 100, type:"Take-Away", tip:"Please add some spices on it" },
  { id: 4, table_no: 'E6', total: 400, type:"Dine-In", tip:"Please add some chilies on it" },
  { id: 5, table_no: 'A10', total: 700, type:"Dine-In",tip:"Please add some garlic on it" },
  { id: 6, table_no: 'A10', total: 700, type:"Dine-In",tip:"Please add some garlic on it" },
  { id: 7, table_no: 'A6', total: 700, type:"Dine-In",tip:"Please add some garlic on it" },
  { id: 8, table_no: 'A10', total: 700, type:"Dine-In",tip:"Please add some garlic on it" },
  { id: 9, table_no: 'A10', total: 700, type:"Dine-In",tip:"Please add some garlic on it" },
]

function OrderList() {
  const [userOrders, setUserOrders] = useState<OrderItemProps[]>([])
  
  useEffect(()=>{
    getOrders()
    .then(res=>{
      setUserOrders(res.data)
    })
  }, [])

  console.log(userOrders)
  
  return (
    <div className="flex justify-between items-center bg-primary-100 flex-wrap p-7 w-full cursor-pointer" >
      {userOrders.length>0 && userOrders.map(order=>(
        <OrderItem key={order._id} {...order}/>
      ))}
    </div>
  )
}

export default OrderList