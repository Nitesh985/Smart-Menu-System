import { Radio } from "../../components"
import { OrderList } from "../../components/admin"

const options = ["All", "Dine-In", "Take-Away", "Delivery"]

function Orders(){
    return (
        <>
            <Radio options={options} />
            <OrderList />
        </>
    )
}

export default Orders