import { useEffect, useState } from 'react';
import { Card, Loader } from '../..';
import OrderItem from './OrderItem';
import { getOrders } from '../../../api/order';
import { OrderItemProps } from './OrderItem';
import { Link } from 'react-router-dom';


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
          <Link to={'./order-details'}>
            <OrderItem key={order._id} {...order}/>
          </Link>
      ))}
    </div>
  )
}

export default OrderList