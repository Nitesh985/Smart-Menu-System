import { Router } from "express";
import { makeOrder, getAllOrders, getOrders, deleteOrder, getOrder, updateOrder } from '../controllers/order.controllers.js'
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/make-order").post(makeOrder);
router.route("/").get(verifyAdmin, getAllOrders)
router.route("/get-orders/:orderType").get(verifyAdmin, getOrders)
router.route("/get-order/:orderId").get(getOrder)
router.route("/update-order/:orderId").patch(updateOrder)
router.route("/delete-order/:orderId").delete(verifyAdmin, deleteOrder)


export default router;