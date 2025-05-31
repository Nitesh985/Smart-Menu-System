import { useLocation, useParams } from "react-router-dom"
import { Loading, OrderForm } from "../../components"
import { useEffect, useState } from "react"
import { getOrder, updateOrder } from "../../api/order"
import { OrderType } from "../../api/order"
import useCartContext from "../../context/CartContext"
import {useNavigate}from 'react-router-dom'


interface FetchOrderType extends OrderType{
  _id:string;
}

function EditOrder() {
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<null | FetchOrderType>(null)
  const {orderId} = useParams()
  const {getNoOfItems, setCartItems} = useCartContext()


  useEffect(()=>{
    if(orderId){
      setLoading(true)
      updateOrder(orderId, {isEditing:true})
      getOrder(orderId)
      .then(res=>{
        setOrder(res.data)
        if (!getNoOfItems()){
          setCartItems(res.data?.orderItems)
        }
        })
        .finally(()=>setLoading(false))
      }
  }, [orderId, setCartItems, getNoOfItems])

  if (loading) return <Loading />

  return (
    <>
      {order && <OrderForm {...order} />}
    </>
  )
}

export default EditOrder