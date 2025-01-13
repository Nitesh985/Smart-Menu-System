import { Router } from "express";
import { makeOrder, getAllOrders, getOrders } from '../controllers/order.controllers.js'

const router = Router();

router.route("/make-order").post(makeOrder);
router.route("/").get(getAllOrders)
router.route("/get-orders").get(getOrders)

export default router;