import { Radio, SelectOptions } from "../../components"
import { OrderList } from "../../components/admin"

const options = ["All", "Dine-In", "Take-Away", "Delivery"]

function Orders(){
    return (
        <>
            <div className="flex justify-center mt-3" >
                <SelectOptions className="bg-orange-300 flex" optionStyles="bg-slate-300" options={options} />
            </div>
            <OrderList />
        </>
    )
}

export default Orders