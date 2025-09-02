import express from "express";
import { getDashboardData } from "../controllers/dashboardControllers.js";
import { checkStaffLevelPermissions } from "../middleware/CheckPermissions.js";

import { checkAuthorization } from "../middleware/checkAuthorization.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuthorization, checkStaffLevelPermissions, getDashboardData);

export default router;
