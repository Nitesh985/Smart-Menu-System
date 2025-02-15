import { Router } from "express";
import { getAllTables, getTable, loginOutTable, loginTable, refreshAccessToken } from "../controllers/table.controller.js";
import { verifyAuth, verifyTable } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getAllTables)
router.route("/get-table/:tableId").get(getTable)
router.route("/login").post(loginTable)
router.route("/logout").delete(verifyTable, loginOutTable)
router.route("/refresh-access-token").post(refreshAccessToken)

export default router;