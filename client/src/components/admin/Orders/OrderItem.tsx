import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import {Button} from "../../";



export interface OrderItemProps {
    id: number;
    table_no: string; 
    items: Array<{dishId:string}>;
    total: number;
    type:"Dine-In" | "Take-Away" | "Delivery";
    tip?: string;
}

function OrderItem({table_no, total, type, tip}:OrderItemProps) {
  return (
    <div className="mt-9 w-[300px] h-[300px] border rounded-3xl bg-orange-500 hover:scale-105 flex justify-center items-center transition-all duration-300 ease-linear" >
        <div className="absolute mt-5 mr-5 w-[300px] h-[300px] bg-orange-400 rounded-3xl" >
            <h1 className="text-white text-3xl font-bold text-center mt-4">{table_no}</h1>
            <div className="p-12">
              <p className="text-white text-lg">Total: ${total}</p>
              <p className="text-white text-lg">Type: {type}</p>
              <p className="text-white text-lg">Tip: {tip}</p>
            </div>

        </div>
            <div className="flex justify-between z-10 self-end space-x-14" >
              <Button className="flex bg-green-600 hover:text-green-600 hover:bg-white text-white" >
                  <TiTick size={25} />
                  <p className="font-semibold" >Accept</p>
              </Button>
              <Button className="flex btn btn-secondary bg-red-600 text-white" >
                  <RxCross2 size={25} />
                  <p className="font-semibold" >Reject</p>
              </Button>
            </div>
      </div>
  )
}

export default OrderItem