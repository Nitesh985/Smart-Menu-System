import { Router } from "express";
import { EsewaInitiatePayment, paymentStatus } from "../controllers/payment.controller.js";
const router = Router();

router.route('/initiate-payment').post(EsewaInitiatePayment)
router.route('/payment-status').post(paymentStatus)


export default router;