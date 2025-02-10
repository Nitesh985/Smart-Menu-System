import React from "react";
import Image from "./Image";
import CartItem from "./user/Orders/CartItem";
import { Button } from ".";

export type paymentOptionType = {
  img: string;
  label: string;
  value: "CASH" | "ESEWA" | "";
};

interface SelectPaymentProps {
  paymentMethod: "CASH" | "ESEWA" | "";
  paymentOptions: paymentOptionType[];
  setPaymentMethod: React.Dispatch<React.SetStateAction<"CASH" | "ESEWA" | "">>;
}

const SelectPayment = ({
  paymentMethod,
  paymentOptions,
  setPaymentMethod,
}: SelectPaymentProps) => {
  return (
    <div className="w-[300px] p-2 aspect-square rounded-lg shadow flex flex-col items-center justify-center gap-2 bg-slate-50">
      <p className="capitalize font-semibold self-start">Payment method</p>
      <p className="text-[10px] self-start text-wrap text-gray-500 pb-1">
        This website is not under production&nbsp;
        <span className="font-bold underline">
          `Please don't use real credentials`
        </span>
      </p>
      {paymentOptions.map((item) => (
        <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden">
          <div
            className="flex items-center justify-center gap-2 relative z-10"
            key={item.value}
          >
            <Image className="w-10 h-10" imageUrl={item.img} />
            <p className="flex items-center font-semibold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-700 opacity-0 text-lg">
              {item.label}
            </p>
          </div>
          <input
            className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
            name="payment"
            type="radio"
            checked={item.value===paymentMethod}
            onClick={() => setPaymentMethod(item.value)}
          />
        </label>
      ))}
    </div>
  );
};

export default SelectPayment;
