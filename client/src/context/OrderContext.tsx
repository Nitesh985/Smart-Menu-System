import { createContext, useContext, useEffect, useState } from "react";
import useCartContext from "./CartContext";


const OrderContext = createContext<null | {
  orderId: string;  
  orderEditingMode: boolean;  
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
  setOrderEditingMode: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderId, setOrderId] = useState(()=>{
    const localOrderId = localStorage.getItem("orderId");
    return localOrderId || "";
  })
  const [orderEditingMode, setOrderEditingMode] = useState(false)
 

  useEffect(() => {
    localStorage.setItem("orderId", orderId);
  }, [orderId]);

  const handleBeforeUnload = (event) => {
    localStorage.removeItem("orderId");
};

useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
}, []);



  return (
    <OrderContext.Provider value={{ orderId, setOrderId, orderEditingMode, setOrderEditingMode }}>
      {children}
    </OrderContext.Provider>
  );
};

export default function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
}
