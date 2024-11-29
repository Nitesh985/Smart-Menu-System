import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js"
import { Dish } from "../models/dish.models.js";
import { Order } from "../models/order.models.js";


const makeOrder = asyncHandler(async (req, res)=> {
    const { table_no, orderType, note, orderItems } = req.body;
    const reqFields = ["table_no", "orderType", "orderItems"]
    reqFields.forEach((field) => {
        if (!req.body[field]) {
            throw new ApiError(401, `The ${field} field is required.`);
        }
    });

    orderItems.map(async (food)=>{
        const foodItem = await Dish.findById(food.foodId)
        if (!foodItem){
            throw new ApiError(404, `The food with id ${food.foodId} is not found.`)
        }
        return foodItem
    })

    const order = new Order.create({
        table_no,
        orderType,
        note,
        orderItems,
        totalPrice: orderItems.reduce((acc, item) => acc + (item.food.price * item.quantity), 0)
    });

    res.status(201).json(
        new ApiResponse(201, order, "The order placed successfully")
    )

})


export {
    makeOrder
}