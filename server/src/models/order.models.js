import {Schema, model} from 'mongoose'


const  orderSchema = new Schema({
    table_no:{
        type:Number,
        required: true
    },
    orderType: {
        type: String,
        enum: ["Delivery", "Take Away", "Dine-In"]
    },
    note:{
        type: String
    },
    orderItems:{
        type:[Schema.Types.ObjectId],
        ref: "Food",
        required:true
    }
}, { timestamps: true })


export const Product = model("Order", orderSchema)

