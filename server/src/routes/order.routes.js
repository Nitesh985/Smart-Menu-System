import { Router } from "express";
import { makeOrder } from '../controllers/order.controllers.js'

const router = Router();

router.route("/make-order").post(makeOrder);

export default router;