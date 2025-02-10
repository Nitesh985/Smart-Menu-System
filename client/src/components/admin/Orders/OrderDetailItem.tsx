import React, { useState } from "react";
import { PiPicnicTableFill } from "react-icons/pi";
import { OrderItemProps } from "./OrderItem";
import { Button, Loading } from "../..";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { deleteOrder } from "../../../api/order";

interface OrderDetailItemProps extends OrderItemProps{
  setOrdersUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

function OrderDetailItem({ _id, table_no, orderItems, totalPrice, setOrdersUpdated, isEditing }: OrderDetailItemProps) {
  const [loading, setLoading] = useState(false)

  const handleAcceptBtn = () => {
    setLoading(true)
    if (isEditing){
      alert(`The table no:${table_no} is currently updating the orders`)
      setOrdersUpdated(prevState=>!prevState)
      setLoading(false)
      return
    }
    alert("The order is accepted")
    setLoading(false)
  }


  const handleRejectBtn = () => {

    setLoading(true)
     deleteOrder(_id)
     .then(()=>setOrdersUpdated(prevState=>!prevState))
     .finally(()=>{
      setLoading(false)
    })
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mb-10 flex w-[56%] flex-col items-center justify-center gap-3 rounded-lg border-2 border-gray-400 px-2 py-9">
        <div className="flex w-11/12 items-center justify-center gap-1 border border-gray-400 text-2xl text-orange-500">
          <PiPicnicTableFill />
          <p className="font-semibold">{table_no}</p>
        </div>
        <div className="flex max-h-full w-11/12 flex-col gap-2">
          {orderItems.map((item) => (
            <div className="flex justify-between border border-gray-400 p-3">
              <div className="flex gap-3">
                <p className="w-4 font-bold">{item.quantity}</p>X
                <p className="font-bold">{item.name}</p>
              </div>
              <p className="font-bold text-green-600">₹{item.price}</p>
            </div>
          ))}
        </div>
        <div className="flex w-11/12 items-center justify-end border border-gray-400 p-2">
          {/* <p className="font-bold ml-1" >Total Amount:</p> */}
          <p className="text-3xl font-bold text-green-600">₹{totalPrice}</p>
        </div>
        <div className="mt-3 flex w-11/12 justify-between px-6 py-2">
          <Button className="green-submit-button px-8" onClick={handleAcceptBtn} >
          {loading?
          <p className="font-bold" >...Please Wait</p>:
          <>
            <TiTick size={25} />
            <p className="font-bold" >Accept</p>
          </>}
          </Button>
          <Button onClick={handleRejectBtn} className="red-reject-button px-8">
          {loading?
          <p className="font-bold" >...Please Wait</p>:
          <>
            <RxCross2 size={25} />
            <p className="font-bold" >Reject</p>
          </>}
          </Button>
        </div>
      </div> 
    </div>
  );
}

export default OrderDetailItem;
