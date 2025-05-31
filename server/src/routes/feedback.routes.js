import { Router } from "express";
import { verifyAuth, verifyAdmin } from "../middlewares/auth.middlewares.js";
import { getAllFeedbacks, writeFeedback, deleteFeedback } from "../controllers/feedback.controller.js";
const router = Router();

router.route("/").get(verifyAdmin, getAllFeedbacks)
router.route("/create-feedback").post(verifyAuth, writeFeedback)
router.route("/delete-feedback").delete(verifyAdmin, deleteFeedback)


export default router;