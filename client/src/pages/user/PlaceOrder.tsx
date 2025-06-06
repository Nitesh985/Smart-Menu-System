import { FaArrowLeft, FaCartShopping } from "react-icons/fa6";
import useCartContext from "../../context/CartContext";
import { Button, Image, Input, Loading, Modal, OrderForm, Select, SelectPayment } from "../../components";
import CartItem from "../../components/user/Orders/CartItem";
import { useEffect, useId, useState } from "react";
import { makeOrder, OrderType } from "../../api/order";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { initiatePayment } from "../../api/payment";
import {generateUniqueId} from 'esewajs'
import { getAllTables } from "../../api/table";
import useTableContext from "../../context/TableContext";
import useOrderContext from "../../context/OrderContext";
import { showModal } from "../../components/tagUtils/Modal";
import Dialog from '../../components/Dialog'
import {SignUpForm} from "../../components";
import { useAppSelector } from "../../store/hooks";
import { socket } from "../../App";
import { SubmitHandler } from "react-hook-form";




function Orders() {
  const { cartItems, getCartTotal, clearCart } = useCartContext();
  const {tableNo} = useTableContext()
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const authStatus = useAppSelector(state=>state.auth.status)
  const token = useAppSelector(state=>state.auth.token)
    

  const onSubmit:SubmitHandler<OrderType> = async(data)=>{
    if (!authStatus){
      setIsOpen(true)
      return
    }
    placeOrder(data)

   }

  const placeOrder = (data:OrderType) => {
    const orderItems = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
    const orderData = {
      table_no:tableNo,
      orderItems,
      token,
      note:data.note
    };
    setLoading(true)
    // 201 for new order and 202 for edited order
    makeOrder(orderData)
    .then((res)=>{
        if (res.statusCode===201 && res.success){
          alert("The order was successfully placed!")
          socket.emit("order-placed", res.data._id)
          clearCart()
          navigate("/")
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        setLoading(false)
      })
  }
  
    


    if (!cartItems.length)
      return (
        <>
          <div className="flex min-h-screen flex-col items-center justify-center">
          <Link to="/" >
        <div className="absolute top-0 left-2 mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium ">
          <FaArrowLeft />
          <p>Back</p>
        </div>
      </Link>
            <FaCartShopping className="text-[160px] lg:text-[280px]" />
            <h1 className="roboto-bold ml-5 mt-6 text-3xl">No Orders Yet!</h1>
          </div>
        </>
      );

      return (
        <>
          <OrderForm onSubmit={onSubmit} />
        </>
      )
    
  // return (
  //   <div className="flex flex-col">
  //     <Link to="/" >
  //       <div className="mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium ">
  //         <FaArrowLeft />
  //         <p>Back</p>
  //       </div>
  //     </Link>
  //     <div className="mb-3 mt-4 flex w-full items-center justify-center text-4xl">
  //       <FaCartShopping className="text-4xl" />
  //       <h1 className="montserrat-title ml-3 text-center">Cart</h1>
  //     </div>
  //     {cartItems.length > 0 &&
  //       cartItems.map((item) => (
  //         <div
  //           key={item._id}
  //           className="group mt-5 flex border-spacing-2 items-center justify-between border border-l-0 border-r-0 border-dashed border-white border-b-white border-t-white border-opacity-35 px-4 py-5"
  //         >
  //           <CartItem {...item} />
  //         </div>
  //       ))}
  //     <div className="mr-4 flex justify-end">
  //       <p className="roboto-bold mt-7 text-2xl">
  //         Total: <span className="text-green-600">₹{getCartTotal()}</span>{" "}
  //       </p>
  //     </div>
  //     <div className="divider"></div>
  //       <form onSubmit={handleSubmit}>
  //       <div className="p-5">
  //       <h2 className="px-5 py-3" ><span className="font-bold" >Table no:</span> {tableNo?<span>{tableNo}</span>:<span>No table no was found!</span>}</h2>
  //       <Input
  //         name="note"
  //         placeholder="Note"
  //         value={note}
  //         inputStyles="w-full mt-5 rounded-3xl indent-2 textarea"
  //         onChange={(e) => setNote(e.currentTarget.value)}
  //       />
  //     </div>
  //       <Button
  //         type="submit"
  //         className="green-submit-button bottom-5 mb-6 mt-6 w-full"
  //       >
  //         Check Out
  //       </Button>
  //     </form>
  //       <Modal title="Sign Up" isOpen={isOpen} onClose={()=>{
  //         setIsOpen(false)
  //       }}>
  //         <SignUpForm onClose={()=>{
  //           setIsOpen(false)
  //           placeOrder()
  //           }} />
  //       </Modal>
  //     {loading && <Loading />}
  //   </div>
  // );
}

export default Orders;
