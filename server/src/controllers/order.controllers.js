import { asyncHandler } from "../utils"


const makeOrder = asyncHandler(async (req, res)=> {
    const { table_no, orderType, note, orderItems } = req.body;
    const reqFields = ["table_no", "orderType", "orderItems"]
    reqFields.forEach((field) => {
        if (!req.body[field]) {
            throw new Error(`The ${field} field is required.`);
        }
    });

    orderItems.map(async (food)=>{
        const foodItem = await Food.findById(food.foodId)
        if (!foodItem){
            throw new Error(`The food with id ${food.foodId} is not found.`)
        }
        return foodItem
    })

    const order = new Order({
        table_no,
        orderType,
        note,
        orderItems,
        totalPrice: orderItems.reduce((acc, item) => acc + (item.food.price * item.quantity), 0)
    });

})


export {
    makeOrder
}