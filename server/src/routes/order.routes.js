import { Router } from "express";
import { makeOrder, getAllOrders, getOrders, deleteOrder } from '../controllers/order.controllers.js'

const router = Router();

router.route("/make-order").post(makeOrder);
router.route("/").get(getAllOrders)
router.route("/get-orders/:orderType").get(getOrders)
router.route("/delete-order/:orderId").delete(deleteOrder)

export default router;