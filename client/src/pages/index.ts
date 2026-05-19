// admin
import AdminLayout from "./admin/AdminLayout";
import MenuPage from './user/UserOrder'
import QRCodesPage from "./admin/QRCodes";
import NotFoundPage from "./not-found";
import  Orders from "./admin/Orders";
import EditMenu  from "./admin/EditMenu";
import OrderDetails from "../components/admin/Orders/Kitchen";
import Feedbacks from "./admin/Feedbacks";

// user
import Home from './user/Home'
import PlaceOrder from './user/PlaceOrder'
import EditOrder from "./user/EditOrder";
import UserOrderList from './user/UserOrder'
import DishDescription from './user/DishDescription'
import IndexPage from "./user/IndexPage";


// payment
import PaymentSuccessPage from "./payment/Success";
import PaymentFailurePage from './payment/Failure';

export {
    // admin
    AdminLayout,
    MenuPage,
    QRCodesPage,
    NotFoundPage,
    Orders,
    EditMenu,
    OrderDetails,
    Feedbacks,

    // user
    Home,
    PlaceOrder,
    UserOrderList,
    DishDescription,
    EditOrder,
    IndexPage,

    // payment
    PaymentFailurePage,
    PaymentSuccessPage

}
