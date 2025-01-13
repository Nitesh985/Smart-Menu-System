import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js"
import { Dish } from "../models/dish.models.js";
import { Order } from "../models/order.models.js";


const makeOrder = asyncHandler(async (req, res)=> {
    const { table_no, orderType, note, orderItems } = req.body;
    const reqFields = ["table_no", "orderType", "orderItems"]
    
    console.log("Hey")
    reqFields.forEach((field) => {
        if (!req.body[field]) {
            throw new ApiError(401, `The ${field} field is required.`);
        }
    });
    
    if (!orderItems.length){
        throw new ApiError(404, "No dishes were selected!")
    }


    orderItems.map(async (food)=>{
        const foodItem = await Dish.findById(food._id)
        if (!foodItem){
            throw new ApiError(404, `The food with id ${food._id} is not found.`)
        }
    })

    
    const order = await Order.create({
        table_no,
        orderType,
        note,
        orderItems,
        totalPrice: (orderItems.reduce((acc, item)=>acc+(item.price*item.quantity), 0)).toFixed(2)
    });

    res.status(201).json(
        new ApiResponse(201, order, "The order placed successfully")
    )

})

const getAllOrders = asyncHandler(async (req, res)=> {
    const orders = await Order.aggregate([
        {
            $lookup:{
                from:"dishes",
                localField:"orderItems._id",
                foreignField:"_id",
                as:"dishes"
            }
        },
        {
            $merge:{
                into:orderItems,
                on:"_id"
            }
        }
    ])

    // const updatedOrders = orders.map((order)=>order.orderItems.map(async item => {
    //         return await Dish.findById(item._id)
    //     }))

    return res.json(
        new ApiResponse(200, orders, "All orders fetched sucessfully!")
    )

})

const getOrders = asyncHandler(async (req, res)=>{
    const {orderType} = req.query
    
    const orders = await Order.aggregate([
        {
            $lookup:{
                from:"dishes",
                localField:"orderItems._id",
                foreignField:"_id",
                as:"orderItems"
            }
        }
    ]) 

    return res.json(
        new ApiResponse(200, orders, "The orders fetched successfully")
    )
})


export {
    makeOrder,
    getAllOrders,
    getOrders
}