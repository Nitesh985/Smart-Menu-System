import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../../";
import { Dish } from "../../../api/dish";
import { deleteOrder } from "../../../api/order";
import { useState } from "react";
import AcceptBtn from "./AcceptBtn";
import RejectBtn from "./RejectBtn";

export interface OrderItemProps {
  _id: string;
  table_no: string;
  orderType:"Delivery" | "Take Away" | "Dine-In"
  note: string;
  orderItems: Dish[];
  totalPrice: number;
  isEditing: boolean;
  status: "PENDING" | "PREPARING" | "READY" | "CANCELLED",
  setOrdersUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

function OrderItem({ _id, table_no, totalPrice,  note, orderItems, setOrdersUpdated, isEditing }: OrderItemProps) {
  const [loading, setLoading] = useState(false)
  const handleAccept = () => {
    
  };
  const handleReject = () => {
    setLoading(true)
    deleteOrder(_id)
    .finally(()=>{
     setLoading(false)
   })
  };


  return (
    <div className="mt-9 flex min-h-[350px] max-h-[600px] w-[300px] items-center justify-center rounded-3xl border bg-orange-500 transition-all duration-300 ease-linear hover:scale-105">
      <div className="absolute mr-5 mt-5 min-h-[350px] max-h-[600px] w-[300px] rounded-3xl bg-orange-400">
        <h1 className="mt-4 text-center text-3xl font-bold text-white">
          {table_no}
        </h1>
        <div className="px-12 mt-4">
          <div className="text-lg text-white flex flex-col" >
            {orderItems.length>0 && orderItems.map(item=>(
              <div className="flex justify-between text-md" >
              <p>{item.name}</p>
              X
              <p>{item.quantity}</p>
              </div>
          ))} </div>
          <p className="text-lg text-white mt-3">Total: ₹{totalPrice}</p>
          {note && <p className="text-lg text-white">Note: {note}</p>}
        </div>
      </div>
      <div className="z-10 flex justify-between space-x-14 self-end">
        <AcceptBtn _id={_id} isEditing={isEditing} setOrdersUpdated={setOrdersUpdated} table_no={table_no} />
        <RejectBtn _id={_id} setOrdersUpdated={setOrdersUpdated} />
      </div>
    </div>
  );
}

export default OrderItem;
