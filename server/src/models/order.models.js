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
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
})

const orderSchema = new Schema({
    table_no:{
        type:String,
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

