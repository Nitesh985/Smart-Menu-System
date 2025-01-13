import React from "react";
import { PiPicnicTableFill } from "react-icons/pi";
import { OrderItemProps } from "./OrderItem";

function OrderDetailItem({ table_no, orderItems, totalPrice }: OrderItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex w-3/6 items-center justify-center gap-1 border text-2xl">
        <PiPicnicTableFill />
        <p className="font-semibold">{table_no}</p>
      </div>
      <div className="flex max-h-full w-3/6 flex-col gap-1">
        {orderItems.map((item) => (
          <div className="flex justify-between border p-3">
            <div className="flex gap-3" >
                <p className="text-black font-bold" >{item.quantity}</p>
                X
                <p className="font-bold" >{item.name}</p>
            </div>
            <p className="font-bold text-green-600">${item.price}</p>
          </div>
        ))}
      </div>
      <div className="flex w-3/6 justify-end border p-2 ">
        <p className="text-3xl font-bold text-green-600 " >${totalPrice}</p>
      </div>
      
    </div>
  );
}

export default OrderDetailItem;
