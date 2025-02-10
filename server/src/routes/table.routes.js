import { Router } from "express";
import { getAllTables, getTable, loginOutTable, loginTable, refreshAccessToken } from "../controllers/table.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getAllTables)
router.route("/get-table/:tableId").get(getTable)
router.route("/login").post(loginTable)
router.route("/logout").delete(verifyJWT, loginOutTable)
router.route("refresh-access-token").post(refreshAccessToken)

export default router;