import { ApiError, ApiResponse, asyncHandler, uploadToCloudinary } from "../utils/index.js";
import { Dish } from "../models/dish.models.js";
import { Category } from "../models/category.models.js";

const getAllDishes = asyncHandler(async (req, res) => {
    const foodItems = await Dish.find();
    if (!foodItems) {
        throw new ApiError(404, "The food items were not available");
    }
    return res.json(
        new ApiResponse(200, foodItems, "The food items fetched successfully")
    );
});

const getDishItemById = asyncHandler(async (req, res) => {
    const { dishId } = req.params;
    const dishItem = await Dish.findById(dishId);
    if (!dishItem) {
        throw new ApiError(404, "The food item by that id was not found");
    }
    return res.json(
        new ApiResponse(200, foodItem, "The food item fetched successfully")
    );
});

const addDishItem = asyncHandler(async (req, res) => {
    const { name, price, category, description } = req.body;
    
    const imagePaths = req.files
    const images = []
    for (const imagePath of imagePaths) {
        const image = await uploadToCloudinary(imagePath)
        images.push(image)
    }

    if (!images ||!images.length || images.length!== imagePaths.length) {
        throw new ApiError(500, "Something went wrong uploading the image");
    }

    const categoryId = await Category.find({name:category})

    const foodAdded = await Dish.create({ name, price, categoryId, description})

    if (!foodAdded) {
        throw new ApiError(500, "Error while adding the food item");
    }

    return res.json(
        new ApiResponse(201, foodItem, "The food item added successfully")
    );
});

const removeDishItem = asyncHandler(async (req, res)=>{
    const { foodId } = req.params

    if (!foodId){
        throw new ApiError(400, "The food id is not given")
    }

    const foodRemoved = await Dish.findByIdAndRemove(foodId)
    if (!foodRemoved) {
        throw new ApiError(404, "The food item by that id was not found")
    }
    return res.json(
        new ApiResponse(200, foodRemoved, "The food item removed successfully")
    )
})

const updateDishItem = asyncHandler(async (req, res)=>{
    const { foodId } = req.params
    const foodUpdates = req.body

    if (!foodId){
        throw new ApiError(400, "The food id is not given")
    }

    if (!foodUpdates){
        throw new ApiError(400, "The food updates are not given")
    }
    
    const updatedFood = await Dish.findByIdAndUpdate(foodId, {...foodUpdates}) 

    if (!updatedFood){
        throw new ApiError(404, "The food item by that id was not found")
    }
});

const searchDishItem = asyncHandler(async(req, res)=>{
    const { s } = req.query
    const query = s.toLowerCase().trim()

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

    if (!foodItems.length) {
        throw new ApiError(404, "No food items found with the given keyword");
    }
    
    return res.json(
        new ApiResponse(200, foodItems, "Food items found with the given keyword")
    );
});


export {
    getAllDishes,
    getDishItemById,
    addDishItem,
    removeDishItem,
    updateDishItem,
    searchDishItem
}