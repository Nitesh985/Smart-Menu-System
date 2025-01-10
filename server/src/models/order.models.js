import {Schema, model} from 'mongoose'

const orderItemSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "Dish",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        requried: true
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
    },
    totalPrice:{
        type: Number,
        required: true
    }
}, { timestamps: true })


export const Order = model("Order", orderSchema)

