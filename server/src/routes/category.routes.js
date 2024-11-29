import { Router } from "express";
import {addCategory, deleteCategory, getAllCategories, getDishByCategory, updateCategory} from '../controllers/category.controller.js'

const router = Router();

router.route('/').get(getAllCategories)
router.route('/get-dish-by-category/:categoryId').get(getDishByCategory)
router.route('/add-category').post(addCategory)
router.route('/delete-category').delete(deleteCategory)
router.route('/update-category').patch(updateCategory)


export default router;