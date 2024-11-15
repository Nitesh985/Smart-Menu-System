import {Schema, model} from 'mongoose'

const orderItemSchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new Schema({
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
        type:[orderItemSchema],
        required:true
    }
}, { timestamps: true })


export const Order = model("Order", orderSchema)

