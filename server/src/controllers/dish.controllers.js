import { ApiError, ApiResponse, asyncHandler, uploadToCloudinary } from "../utils/index.js";
import { Dish } from "../models/dish.models.js";
import { Category } from "../models/category.models.js";
import mongoose from 'mongoose'


const getAllDishes = asyncHandler(async (req, res) => {
    const foodItems = await Dish.find({...req.query});
    if (!foodItems) {
        throw new ApiError(404, "The food items were not available");
    }
    return res.json(
        new ApiResponse(200, foodItems, "The food items fetched successfully")
    );
});

const getDishItemById = asyncHandler(async (req, res) => {
    const { dishId } = req.params;
    const dishItem = await Dish.aggregate([
        {
            $match: { 
                _id: new mongoose.Types.ObjectId(dishId)
            }

        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $addFields:{
                category:"$category.name"
            }
        },
    ])

    // const dishItem = await Dish.findById(dishId);
    if (!dishItem) {
        throw new ApiError(404, "The food item by that id was not found");
    }
    return res.json(
        new ApiResponse(200, dishItem[0], "The food item fetched successfully")
    );
});

const addDishItem = asyncHandler(async (req, res) => {
    const { name, price, category, description } = req.body;
    
    const imagePath = req.file?.path

    const image = await uploadToCloudinary(imagePath)

    if (imagePath && !image){
        throw new ApiError(500, "Something went wrong uploading image to cloudinary")
    }

    // const imagePaths = req.files
    // const images = []
    // for (const imagePath of imagePaths) {
    //     const image = await uploadToCloudinary(imagePath)
    //     images.push(image)
    // }

    // if (!images ||!images.length || images.length!== imagePaths.length) {
    //     throw new ApiError(500, "Something went wrong uploading the image");
    // }

    const findCategory = await Category.findOne({name:category})

    if (!findCategory){
        throw new ApiError(400, `The category by the name ${category} does not exist!`)
    }

    const categoryId = findCategory._id

    const foodAdded = await Dish.create({ name, price, image, categoryId, description})


    if (!foodAdded) {
        throw new ApiError(500, "Error while adding the food item");
    }

    return res.json(
        new ApiResponse(201, foodAdded, "The food item added successfully")
    );
});

const removeDishItem = asyncHandler(async (req, res)=>{
    const { dishId } = req.params


    if (!dishId){
        throw new ApiError(400, "The food id is not given")
    }

    const foodRemoved = await Dish.findByIdAndDelete(dishId)
    if (!foodRemoved) {
        throw new ApiError(404, "The food item by that id was not found")
    }
    return res.json(
        new ApiResponse(200, foodRemoved, "The food item removed successfully")
    )
})

const removeAllDishes = asyncHandler(async(req, res)=>{
    const dishesRemoved = await Dish.deleteMany()
    if (!dishesRemoved) {
        throw new ApiError(500, "Error while removing all dishes")
        }
    return res.json(
        new ApiResponse(200, {}, "All dishes removed successfully")
    )
})

const updateDishItem = asyncHandler(async (req, res)=>{
    const { dishId } = req.params
    const dishUpdates = req.body
    const {category} = dishUpdates

    if (!dishId){
        throw new ApiError(400, "The food id is not given")
    }

    if (!dishUpdates){
        throw new ApiError(400, "The food updates are not given")
    }

    const findCategory = await Category.findOne({name:category})
    
    if (category && !findCategory){
        throw new ApiError(400, `The category by the name ${category} does not exist!`)
    }
    const imagePath = req.file?.path

    const image = await uploadToCloudinary(imagePath)

    if (imagePath && !image){
        throw new ApiError(500, "Something went wrong uploading image to cloudinary")
    }

    if (imagePath && image){
        dishUpdates.image = image
    }

    dishUpdates.categoryId = findCategory?._id
    delete dishUpdates.category
    console.log(dishUpdates) 
    
    const updatedFood = await Dish.findByIdAndUpdate(dishId, {...dishUpdates}) 

    if (!updatedFood){
        throw new ApiError(404, "The food item by that id was not found")
    }

    return res.json(
        new ApiResponse(200, updatedFood, "The food item updated successfully")
    );
});

const searchDishItem = asyncHandler(async(req, res)=>{
    const { q } = req.query
    const query = q.toLowerCase().trim()

    const foodItems = await Dish.aggregate([
        {
            $addFields:{
                "nameLwr":{
                    $toLower:"$name"
                }
            }
        },
        {
            $match:{
                "nameLwr":{
                    $regex:query.toLowerCase()
                }
            }
        },
        {
            $project:{
                nameLwr:0
            }
        }
    ])

    
    return res.json(
        new ApiResponse(200, foodItems, "Food items with the given keyword")
    );
});


export {
    getAllDishes,
    getDishItemById,
    addDishItem,
    removeDishItem,
    updateDishItem,
    searchDishItem,
    removeAllDishes,
}