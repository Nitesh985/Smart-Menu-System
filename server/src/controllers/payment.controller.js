import dotenv from "dotenv"
dotenv.config();
import { Payment } from "../models/payment.models.js"; //for saving the ordered data in database
import { EsewaPaymentGateway, EsewaCheckStatus } from "esewajs"; //we install our package hehe
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";


const initiatePayment = asyncHandler(async (req, res, next) => {  
    const { amount, orderId, paymentMethod } = req.body; //data coming from frontend
    const reqFields = ["amount", "orderId", "paymentMethod"]
    const payment = new Payment()
    
    
      reqFields.forEach((field) => {
        if (!req.body[field]) {
          throw new ApiError(401, `The ${field} field is required.`);
        }
      });
    
    
      if (paymentMethod !== "CASH" && paymentMethod !== "ESEWA") {
        throw new ApiError(400, "Please give valid Payment Method")
      }
    
      if (paymentMethod === "CASH") {
        payment.orderId = orderId;
        payment.amount = amount;
        payment.paymentMethod = paymentMethod;
        
        await payment.save()
        
        return res.status(200)
          .json(
            new ApiResponse(200, payment, "Payment initiated successfully")
          );
      }
    
      const reqPayment = await EsewaPaymentGateway(
        amount,
        0,
        0,
        0,
        payment._id,
        process.env.MERCHANT_ID,
        process.env.SECRET,
        process.env.SUCCESS_URL,
        process.env.FAILURE_URL,
        process.env.ESEWAPAYMENT_URL,
        undefined,
        undefined
      );
      if (!reqPayment) {
        throw new ApiError(400, "Error initiating the payment through Esewa")
      }
      if (reqPayment.status === 200) {
        payment.orderId = orderId;
        payment.amount = amount;
        payment.paymentMethod = paymentMethod;
        await payment.save();
        console.log("Transaction passed!!");
        return res.send({
          url: reqPayment.request.res.responseUrl,
        });
      }

})



const paymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
    const payment = await Payment.findOne({ orderId });
    console.log(payment)
    if (!payment) {
      return res.status(400).json({ message: "Transaction not found" });
    }

    // const paymentStatusCheck = await EsewaCheckStatus(payment.amount, payment.orderId, process.env.MERCHANT_ID, process.env.ESEWAPAYMENT_STATUS_CHECK_URL)

    // if (paymentStatusCheck.status === 200) {
      payment.status = "COMPLETE";
      await payment.save();
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Transaction status updated successfully" ));
    // }
})


export { initiatePayment, paymentStatus };
