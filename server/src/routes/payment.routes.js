import { Router } from "express";
import { initiatePayment, paymentStatus } from "../controllers/payment.controller.js";
import { verifyTable, verifyAuth } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route('/initiate-payment').post( initiatePayment)
router.route('/payment-status').post(paymentStatus)


export default router;