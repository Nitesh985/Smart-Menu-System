import { Router } from "express";
import {getAllDishes, getDishItemById, addDishItem, updateDishItem, searchDishItem} from "../controllers/dish.controllers.js";

const router = Router();

router.route('/').get(getAllDishes);
router.route('/get-dish/:dishId').get(getDishItemById)
router.route('/add-dish').post(addDishItem)
router.route('/update-dish').patch(updateDishItem)
router.route('/search-dish').post(searchDishItem)


export default router;