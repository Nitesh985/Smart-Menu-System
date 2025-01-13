import { Outlet } from "react-router-dom"
import { Radio, SelectOptions } from "../../components"
import { OrderList } from "../../components/admin"

const options = ["All", "Dine-In", "Take-Away", "Delivery"]

function Orders(){
    return (
        <>
            <div className="flex justify-center mt-3" >
                <SelectOptions className="bg-orange-300 bg-black flex" optionStyles="bg-black text-white" options={options} />
            </div>
            <Outlet />
        </>
    )
}

export default Orders