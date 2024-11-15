import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category } from "../models/category.models.js"
import { Food } from "../models/food.models.js"


const getAllCategories = asyncHandler(async (req, res)=>{
    const categories = await Category.find({})

    if (!categories){
        throw new ApiError(500, "Something went wrong fetching the categories")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, categories, "All the categories fetched successfully")
        )
})

const getFoodByCategory = asyncHandler(async(req, res)=>{
    const { categoryId } = req.params

    if (!categoryId){
        throw new ApiError(400, "The category is not given")
    }
    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists){
        throw new ApiError(404, "The category by that id is not found")
    }
    const food = await Food.find({ category: categoryId })
    if (!food){
        throw new ApiError(500, "Something went wrong fetching the food")
    }
    return res.json(
        new ApiResponse(200, food, "The food items in the category fetched successfully")
    )

})

export { getAllCategories, getFoodByCategory }
