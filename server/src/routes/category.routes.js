import { Router } from "express";
import {
  addCategory,
  getCategoryById,
  deleteAllCategories,
  deleteCategory,
  getAllCategories,
  getDishByCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getAllCategories);
router.route("/get-category/:categoryId").get(getCategoryById);
router.route("/get-dish-by-category/:categoryId").get(getDishByCategory);
router.route("/add-category").post(verifyAdmin, upload.single("image"), addCategory);
router.route("/delete-category/:categoryId").delete(verifyAdmin, deleteCategory);
router
  .route("/update-category/:categoryId")
  .patch(verifyAdmin, upload.single("image"), updateCategory);
router.route("/delete-all-categories").delete(verifyAdmin, deleteAllCategories);

export default router;
