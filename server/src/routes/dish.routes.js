import { Router } from "express";
import {
  getAllDishes,
  getDishItemById,
  addDishItem,
  removeDishItem,
  updateDishItem,
  searchDishItem,
  removeAllDishes,
} from "../controllers/dish.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/").get(getAllDishes);
router.route("/get-dish/:dishId").get(getDishItemById);
router.route("/add-dish").post(upload.single("image"), addDishItem);
router.route("/update-dish/:dishId").patch(upload.single("image"), updateDishItem);
router.route("/search-dish/s=?").get(searchDishItem);
router.route("/delete-dish/:dishId").delete(removeDishItem);
router.route("/delete-all-dishes").delete(removeAllDishes);

export default router;
