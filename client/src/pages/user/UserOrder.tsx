import { useEffect, useState } from "react"
import { deleteOrder, getOrder, updateOrder } from "../../api/order"
import { TbUserEdit } from "react-icons/tb";
import { Button, Loading } from "../../components"
import { MdDelete } from "react-icons/md";
import useOrderContext from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

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
  const {orderId, setOrderId, setOrderEditingMode} = useOrderContext()
  const navigate = useNavigate()

  
  const handleEdit = () => {
    if (order){
      updateOrder(order._id, {isEditing:true})
      .then(()=>{
        setOrderId(order._id)
        setOrderEditingMode(true)
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
          setOrderId("")
          navigate("/")
        }).catch(err=>console.log(err))
        .finally(()=>{
        setLoading(false)
      })}
  }

  useEffect(()=>{
    setLoading(true)
    if (orderId){
    getOrder(orderId)
    .then(res=>{
        setOrder(res.data[0])
      })
    .finally(()=>setLoading(false))
    }
  }, [orderId])

  // useEffect(()=>{


  //     getTableOrder(tableId)
  //     .then((res)=>{
  //       setOrder(res.data)
  //     })    
  // }, [tableId])

  if (loading) return <Loading />

  if (!order) return <div className="flex justify-center items-center h-screen" >
    <h1 className="text-5xl roboto-bold" >There was no order</h1>
  </div>

  return (
    <div className="p-8">
      <h1 className="roboto-bold text-5xl text-center" >My Order</h1>      
      <div className="border py-10 px-14 mt-7 rounded-badge border-dotted border-slate-600 bg-opacity-60 text-black">
        <h3 >Order Type: {order?.orderType}</h3>
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
      </div>
  )
}

export default UserOrder