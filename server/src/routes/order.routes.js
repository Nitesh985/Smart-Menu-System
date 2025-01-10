import { Router } from "express";
import { makeOrder, getAllOrders } from '../controllers/order.controllers.js'

const router = Router();

router.route("/make-order").post(makeOrder);
router.route("/").get(getAllOrders)
router.route("/get-order")

export default router;