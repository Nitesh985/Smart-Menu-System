import { FaArrowLeft, FaCartShopping } from "react-icons/fa6";
import useCartContext from "../../../context/CartContext";
import {
  Button,
  Input,
  Loading,
  Modal,
  Select,
  SelectOptions,
  SelectPayment,
} from "../../../components";
import CartItem from "../../../components/user/Orders/CartItem";
import { useEffect, useId, useState } from "react";
import { getOrder, makeOrder, updateOrder } from "../../../api/order";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTableContext from "../../../context/TableContext";
import { RxCrossCircled } from "react-icons/rx";
import { useForm, SubmitHandler } from "react-hook-form";
import { OrderType } from "../../../api/order";
import { getAllTables, getTable } from "../../../api/table";
import { Table } from "../../../types/tables.types";

const removeNonUpdatedData = (newData: object, prevData: object) => {
  return Object.entries(newData).map(([key, value]) => {
    if (value === prevData[key]) {
      delete newData[key];
    }
  });
};
interface OrderFormProps {
  onSubmit: SubmitHandler<OrderType>;
}

function OrderForm({ ...order }: OrderFormProps) {
  const { cartItems, getCartTotal, clearCart } = useCartContext();
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<OrderType>({
    shouldUnregister: order?.isEditing,
    defaultValues: {
      note: "Please make it a little quicker!",
      table_no: "A4",
      orderItems: cartItems,
    },
  });

  useEffect(() => {
    getAllTables().then((res) => {
      setTables(res.data);
      setValue("table_no", res.data[0].table_no);
    });
  }, []);

  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    setLoading(true);
    try {
      if (order?.isEditing) {
        const table = await getTable(data.table_no);
        const updatedData = removeNonUpdatedData(data, table.data);
        await updateOrder(order._id, updatedData);
      } else {
        await makeOrder(data);
      }
      setLoading(false);
      clearCart();
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    }

  //  const onSubmit: SubmitHandler<OrderType> = async (data) => {
  //   setLoading(true)
  //   if (order && order?.isEditing){

  //     updateOrder(order._id, data)
  //     .then(res=>{
  //       // TODO: User-Order format
  //       // ----------------------------------------
  //       // orderstuff         1st shift
  //       // ----------------------------------------
  //       // orderstuff         2nd shift
  //       // ----------------------------------------
  //       if (res.statusCode===202){
  //         socket.emit("user-order", res.data)
  //         alert("Your order has been successfully updated!")
  //         navigate("/")
  //       }
  //     }).finally(()=>setLoading(false))
  //      return
  //    }
  //    makeOrder(data).then((res)=>{

  //     if (res.success){
  //       socket.emit("user-order", res.data)
  //       if (res.statusCode===201) alert("Your order has been successfully placed!")
  //       if (res.statusCode===202) alert("Your order has been successfully updated!")
  //       navigate("/")
  //       }
  //    }).finally(()=>setLoading(false))
  //  }

  const handleEditCancellation = () => {
    if (order && order?.isEditing) {
      updateOrder(order._id, { isEditing: false }).then(() => {
        clearCart();
        navigate("/");
      });
    }
  };

  return (
    <div className="flex flex-col">
      {order?.isEditing ? (
        <div
          className="absolute top-0 left-2 mt-6 p-3 font-garamond w-28 flex items-center justify-center rounded-full bg-slate-500 text-white gap-1 hover:gap-2 font-medium cursor-pointer "
          onClick={handleEditCancellation}
        >
          <RxCrossCircled className="text-lg" />
          <p>Cancel</p>
        </div>
      ) : (
        <Link to="/">
          <div className="absolute top-0 left-2 mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium ">
            <FaArrowLeft />
            <p>Back</p>
          </div>
        </Link>
      )}
      <div className="mb-3 mt-4 flex w-full items-center justify-center text-4xl">
        <FaCartShopping className="text-4xl" />
        <h1 className="montserrat-title ml-3 text-center">Cart</h1>
      </div>
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div
            key={item._id}
            className="group mt-5 flex border-spacing-2 items-center justify-between border border-l-0 border-r-0 border-dashed border-white border-b-white border-t-white border-opacity-35 px-4 py-5"
          >
            <CartItem {...item} />
          </div>
        ))}
      {order && order?.isEditing && (
        <Link to="/" className="self-center">
          <Button className="w-[250px] mt-7 self-center text-white bg-orange-500 border-orange-500 hover:border-orange-400 hover:bg-orange-400">
            ...Add More Dishes
          </Button>
        </Link>
      )}
      <div className="mr-4 flex flex-col justify-end items-end">
        <p className="roboto-bold mt-7 text-2xl">
          Total: <span className="text-green-600">Rs.{getCartTotal()}</span>{" "}
        </p>
      </div>
      <div className="divider"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <h2 className="px-5 py-3 flex justify-between items-center">
            <span className="font-bold w-20">Table no:</span>{" "}
            <Select>
              {tables.map((table) => (
                <option
                  key={table._id}
                  disabled={table.occupied}
                  onClick={() => setTableNo(table.table_no)}
                >
                  {table.table_no}
                </option>
              ))}
            </Select>
          </h2>
          <Input
            placeholder="Note"
            inputStyles="w-full mt-7 rounded-3xl indent-2"
            {...register("note", { required: true })}
          />
        </div>
        <Button
          type="submit"
          className="green-submit-button bottom-5 mb-6 mt-6 w-full"
        >
          {order?.isEditing ? "Edit Order" : "Place Order"}
        </Button>
      </form>
      {loading && <Loading />}
    </div>
  );
}

function OrderForm1({ ...order }) {
  const { cartItems, getCartTotal, clearCart } = useCartContext();
  const { tableNo } = useTableContext();
  const [note, setNote] = useState(order?.note || "");
  const [orderType, setOrderType] = useState(order?.orderType || "Delivery");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderItems = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
    const data = {
      orderType,
      note,
      orderItems,
      isEditing: false,
    };
    removeNonUpdatedData(data, order);

    setLoading(true);
    updateOrder(order._id, data)
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          alert("Your update was successfull");
          clearCart();
          navigate("/");
          socket.emit("order-placed", order._id);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancellation = () => {
    updateOrder(order._id, { isEditing: false }).then(() => {
      setOrderEditingMode(false);
      clearCart();
      navigate("/");
    });
  };

  // if (!cartItems.length)
  //   return (
  //     <>
  //     <div className="flex min-h-screen flex-col items-center justify-center" >
  //     {order?.isEditing?<div className="absolute top-0 left-2 mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium "  onClick={handleCancellation}>
  //       <FaArrowLeft />
  //       <p>Cancel</p>
  //     </div>
  //     :
  //     <Link to="/" >
  //     <div className="absolute top-0 left-2 mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium ">
  //       <FaArrowLeft />
  //       <p>Back</p>
  //     </div>
  //   </Link>
  //     }
  //         <FaCartShopping className="text-[160px] lg:text-[280px]" />
  //         <h1 className="roboto-bold ml-5 mt-6 text-3xl">No Orders Yet!</h1>
  //       </div>
  //     </>
  //   );

  return (
    <div className="flex flex-col">
      {order?.isEditing ? (
        <div
          className="absolute top-0 left-2 mt-6 p-3 font-garamond w-28 flex items-center justify-center rounded-full bg-slate-500 text-white gap-1 hover:gap-2 font-medium cursor-pointer "
          onClick={handleCancellation}
        >
          <RxCrossCircled className="text-lg" />
          <p>Cancel</p>
        </div>
      ) : (
        <Link to="/">
          <div className="absolute top-0 left-2 mt-6 p-3 font-garamond w-24 flex items-center justify-center rounded-full bg-orange-500 text-white gap-1 hover:gap-2 font-medium ">
            <FaArrowLeft />
            <p>Back</p>
          </div>
        </Link>
      )}
      <div className="mb-3 mt-4 flex w-full items-center justify-center text-4xl">
        <FaCartShopping className="text-4xl" />
        <h1 className="montserrat-title ml-3 text-center">Cart</h1>
      </div>
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div
            key={item._id}
            className="group mt-5 flex border-spacing-2 items-center justify-between border border-l-0 border-r-0 border-dashed border-white border-b-white border-t-white border-opacity-35 px-4 py-5"
          >
            <CartItem {...item} />
          </div>
        ))}
      <Link to="/" className="self-center">
        <Button className="w-[250px] mt-7 self-center text-white bg-orange-500 border-orange-500 hover:border-orange-400 hover:bg-orange-400">
          ...Add More Dishes
        </Button>
      </Link>
      <div className="mr-4 flex flex-col justify-end items-end">
        <p className="roboto-bold mt-7 text-2xl">
          Total: <span className="text-green-600">Rs.{getCartTotal()}</span>{" "}
        </p>
      </div>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <div className="p-5">
          <h2 className="px-5 py-3">
            <span className="font-bold">Table no:</span>{" "}
            {tableNo ? (
              <span>{tableNo}</span>
            ) : (
              <span className="loading loading-bars loading-md"></span>
            )}
          </h2>
          <Input
            name="note"
            placeholder="Note"
            value={note}
            inputStyles="w-full mt-7 rounded-3xl indent-2"
            onChange={(e) => setNote(e.currentTarget.value)}
          />
        </div>
        <Button
          type="submit"
          className="green-submit-button bottom-5 mb-6 mt-6 w-full"
        >
          Edit Order
        </Button>
      </form>
      {loading && <Loading />}
    </div>
  );
}

export default OrderForm;
