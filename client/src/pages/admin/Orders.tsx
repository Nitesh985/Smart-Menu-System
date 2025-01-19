import { Outlet } from "react-router-dom"
import { Radio, SelectOptions } from "../../components"
import { OrderList } from "../../components/admin"



function Orders(){
    return (
        <>
            <Outlet />
        </>
    )
}

export default Orders