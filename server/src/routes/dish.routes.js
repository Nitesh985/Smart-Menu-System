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
import { verifyAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getAllDishes);
router.route("/get-dish/:dishId").get(getDishItemById);
router.route("/search-dish").get(searchDishItem);
router.route("/add-dish").post(verifyAdmin, upload.single("image"), addDishItem);
router.route("/update-dish/:dishId").patch(verifyAdmin, upload.single("image"), updateDishItem);
router.route("/delete-dish/:dishId").delete(verifyAdmin, removeDishItem);
router.route("/delete-all-dishes").delete(verifyAdmin, removeAllDishes);

export default router;
