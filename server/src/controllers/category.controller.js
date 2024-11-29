import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category } from "../models/category.models.js"
import { Dish } from "../models/dish.models.js"


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

const getDishByCategory = asyncHandler(async(req, res)=>{
    const { categoryId } = req.params

    if (!categoryId){
        throw new ApiError(400, "The category is not given")
    }
    const categoryExists = await Category.findById(categoryId)
    if (!categoryExists){
        throw new ApiError(404, "The category by that id is not found")
    }
    const food = await Dish.find({ category: categoryId })
    if (!food){
        throw new ApiError(500, "Something went wrong fetching the food")
    }
    return res.status(200).json(
        new ApiResponse(200, food, "The food items in the category fetched successfully")
    )

})

const addCategory = asyncHandler(async(req, res)=>{
    const { name, description } = req.body

    const categoryExists = await Category.findOne({name})

    if (categoryExists){
        throw new ApiError(400, `The category by the name ${name} already exists!`)
    }

    const newCategory = await Category.create({ name, 
        description })
    console.log("Everything running quite well")
    console.log(newCategory)

    if (!newCategory){
        throw new ApiError(500, "Something went wrong adding the category")
    }

    return res.status(201).json(
        new ApiResponse(201, newCategory, "The category added successfully")
    )

})



const updateCategory = asyncHandler(async(req, res)=>{
    const { categoryId } = req.params
    const categoryUpdates = req.body
    const category = await Category.findByIdAndUpdate(categoryId, categoryUpdates, { new: true})
        
    if (!category){
        throw new ApiError(404, "The category by that id is not found")
    }

    return res.status(200).json(
        new ApiResponse(200, category, "The category updated successfully")
    )
})

const deleteCategory = asyncHandler(async(req, res)=>{
    const { categoryId } = req.params
    const category = await Category.findByIdAndDelete(categoryId)
    
    if (!category){
        throw new ApiError(404, "The category by that id is not found")
    }
    
    return res.status(200).json(
        new ApiResponse(200, category, "The category deleted successfully")
    )
})


export { getAllCategories, getDishByCategory, addCategory, updateCategory, deleteCategory }
