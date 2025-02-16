import { Router } from "express";
import { verifyAuth, verifyAdmin } from "../middlewares/auth.middlewares.js";
import { getAllFeedbacks, writeFeedback } from "../controllers/feedback.controller.js";
const router = Router();

router.route("/").get(verifyAdmin, getAllFeedbacks)
router.route("/create-feedback").post(verifyAuth, writeFeedback)


export default router;