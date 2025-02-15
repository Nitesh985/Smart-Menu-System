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
    tableId:{
        type:Schema.Types.ObjectId,
        ref:"Table",
        required: true
    },
    orderedBy:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    isEditing:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ["PENDING", "PREPARING", "READY", "CANCELLED"],
        default: "PENDING"
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

