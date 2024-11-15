import { ApiError, ApiResponse, asyncHandler, uploadToCloudinary } from "../utils";
import { Food } from "../models/food.models";


const getAllFoodItems = asyncHandler(async (req, res) => {
    const foodItems = await Food.find();
    if (!foodItems) {
        throw new ApiError(404, "The food items were not available");
    }
    return res.json(
        new ApiResponse(200, foodItems, "The food items fetched successfully")
    );
});

const getFoodItemById = asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
        throw new ApiError(404, "The food item by that id was not found");
    }
    return res.json(
        new ApiResponse(200, foodItem, "The food item fetched successfully")
    );
});

const addFoodItem = asyncHandler(async (req, res) => {
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

    const foodAdded = await Food.create({ name, price, category, description})

    if (!foodAdded) {
        throw new ApiError(500, "Error while adding the food item");
    }

    return res.json(
        new ApiResponse(201, foodItem, "The food item added successfully")
    );
});

const removeFoodItem = asyncHandler(async (req, res)=>{
    const { foodId } = req.params

    if (!foodId){
        throw new ApiError(400, "The food id is not given")
    }

    const foodRemoved = await Food.findByIdAndRemove(foodId)
    if (!foodRemoved) {
        throw new ApiError(404, "The food item by that id was not found")
    }
    return res.json(
        new ApiResponse(200, foodRemoved, "The food item removed successfully")
    )
})

export {
    getAllFoodItems,
    getFoodItemById,
    addFoodItem,
    removeFoodItem
}