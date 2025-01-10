import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.models.js";
import { Dish } from "../models/dish.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (!categories) {
    throw new ApiError(500, "Something went wrong fetching the categories");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        categories,
        "All the categories fetched successfully"
      )
    );
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(400, "The category id is not given!");
  }

  const findCategory = await Category.findById(categoryId);

  if (!findCategory) {
    throw new ApiError(404, "The category by that id is not found");
  }

  return res
   .status(200)
   .json(
      new ApiResponse(
        200,
        findCategory,
        "The category fetched successfully"
      )
    );
});

const getDishByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
    throw new ApiError(404, "The category by that id is not found");
  }
  const food = await Dish.find({ categoryId });
  if (!food) {
    throw new ApiError(500, "Something went wrong fetching the food");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        food,
        "The food items in the category fetched successfully"
      )
    );
});

const addCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "The name of the category is required");
  }
  // "The "path" argument must be of type string or an instance of Buffer or URL. Received an instance of Object"

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    throw new ApiError(400, `The category by the name ${name} already exists!`);
  }

  const imagePath = req.file?.path;

  const image = await uploadToCloudinary(imagePath);

  if (!image && imagePath) {
    throw new ApiError(500, "Failed to upload the image to cloudinary");
  }

  const newCategory = await Category.create({ name, description, image });

  if (!newCategory) {
    throw new ApiError(500, "Something went wrong adding the category");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newCategory, "The category added successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const categoryUpdates = req.body;

  if (!categoryId){
    throw new ApiError(400, "The category id is not given");
  }

  if (!categoryUpdates){
    throw new ApiError(400, "The category updates are not given");
  }

  const imagePath = req.file?.path

  const image = await uploadToCloudinary(imagePath)

  if (imagePath && !image){
    throw new ApiError(500, "Something went wrong uploading image to cloudinary")
  }

  if (imagePath && image){
    categoryUpdates.image = image
  }

  const category = await Category.findByIdAndUpdate(
    categoryId,
    categoryUpdates,
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, "The category by that id is not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "The category updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    throw new ApiError(404, "The category by that id is not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "The category deleted successfully"));
});

const deleteAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.deleteMany();

  if (!categories) {
    throw new ApiError(500, "Something went wrong deleting all categories");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All categories deleted successfully"));
});

export {
  getAllCategories,
  getCategoryById,
  getDishByCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
