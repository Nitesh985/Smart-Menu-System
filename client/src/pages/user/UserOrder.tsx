import { useCallback, useEffect, useState } from "react"
import { deleteOrder, getOrder, getTableOrder, updateOrder } from "../../api/order"
import { TbRefresh, TbUserEdit } from "react-icons/tb";
import { Button, Loading } from "../../components"
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import GiveReview from "../../components/user/UserOrder/GiveReview";
import PaymentGateway from "../../components/user/UserOrder/PaymentGateway";
import { socket } from "../../App";



export interface FetchOrderType{
  _id:string;
  table_no: string;
  orderType: string;
  note: string;
  orderItems: {
      _id: string;
      name: "Momo",
      image: {
          "url": string,
          "public_id": string,
      },
      description: string,
      price: number,
      categoryId: Date,
      createdAt: Date,
      updatedAt: Date,
      quantity: number
  }[];
  totalPrice: number;
  status: "PENDING" | "PREPARING" | "READY" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

function UserOrder() {
  const [order, setOrder] = useState<null | FetchOrderType>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  
  const handleEdit = () => {
    if (order){
      updateOrder(order._id, {isEditing:true})
      .then(()=>{
        navigate(`/edit-order/o/${order._id}`)
      }
      )
    }
  }

  const handleDelete = async() => {
      if (order){
        setLoading(true)
        deleteOrder(order?._id)
        .then(()=>{
          navigate("/")
        }).catch(err=>console.log(err))
        .finally(()=>{
        setLoading(false)
      })}
  }
  const fetchOrders = useCallback(() => {
    setLoading(true)
    // TODO:Get table Order
    getTableOrder()
    .then((order)=>{
      setOrder(order)
    })
    .finally(()=>setLoading(false))


  }, [])

  useEffect(()=>{
    socket.on("order-status", (order)=>{
      console.log(order)
      setOrder(order)
    })

  }, [])

  // useEffect(()=>{


  //     getTableOrder(tableId)
  //     .then((res)=>{
  //       setOrder(res.data)
  //     })    
  // }, [tableId])

  // if (loading) return <Loading />

  // if (!order) return <div className="flex justify-center items-center h-screen" >
  //   <h1 className="text-5xl roboto-bold" >There was no order</h1>
  // </div>

  return (
    <div className="p-4 sm:p-8">
      <h1 className="roboto-bold text-5xl text-center" >My Order</h1>
      <Button onClick={fetchOrders} className="bg-green-600 border-none hover:bg-green-500 " ><TbRefresh /></Button>    
      <div className="border py-5 sm:py-10 px-7 sm:px-14 mt-7 rounded-badge border-dotted border-slate-600 bg-opacity-60 text-black">
        <h3 >Status: {order?.status}</h3>
        {order?.note && <h3>Note: {order.note}</h3>}
        <h3>Total Price: <span className="text-green-600" >₹{order?.totalPrice}</span></h3>
        <h3>Table Number: {order?.table_no}</h3>
        <h3 className="flex gap-2" >Order Items:
        {order?.orderItems?.map((item, index) => (
          <div key={item._id} className="flex gap-3" >
            {index!==0 && <span>,</span>}
            <p>{item.quantity}</p> X
            <p>{item.name}</p>
          </div>
        ))}
        </h3>
      {order?.status==="PENDING" && <div className="mt-5 flex justify-between px-2 py-1" >
          <Button className=" px-11 text-white bg-yellow-400 border-none font-bold hover:bg-yellow-300" onClick={handleEdit} >
              <div className="flex items-center gap-1" >
                <TbUserEdit className="text-xl"  />
                <p className="text-[16px]" >Edit</p>
              </div>
          </Button>
      <Button onClick={handleDelete} className=" px-8 text-white bg-red-500 border-none font-bold hover:bg-red-400" >
            <div className="flex items-center gap-1" >
              <MdDelete className="text-xl"  />
              <p className="text-[16px]" >Delete</p>
            </div>
        </Button>
      </div>}
      </div>
        { order?.status==="READY" && <>
          <div className="divider font-semibold" >Payment Options</div>
          <PaymentGateway orderId={order?._id} totalPrice={order?.totalPrice} />
          <div className="divider" ></div>
                <h3 className="text-xl font-semibold px-6 mt-16" >Please tell us about your experience</h3>
                <GiveReview />
        </>}
      </div>
  )
}

export default UserOrder