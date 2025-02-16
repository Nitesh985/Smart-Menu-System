import {Schema, model} from "mongoose";

const paymentSchema = new Schema(
  {
    orderId: {
      type:Schema.Types.ObjectId,
      ref:"Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"], // Example statuses
      default: "PENDING",
    },
    paymentMethod:{
      type: String,
      required: true,
      enum: ["ESEWA", "CASH"]
    },
    
  },
  {
    timestamps: true, 
    }
);

export const Payment = model("Payment", paymentSchema);