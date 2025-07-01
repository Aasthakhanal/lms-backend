import express from "express";
import { checkauthorization } from "../middleware/checkauthorization.js";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  returnBook,
  updateTransaction,
  updateTransactionStatus,
} from "../controllers/transactionControllers.js";
import { checkStaffLevelPermissions } from "../middleware/CheckPermissions.js";

const router = express.Router();

router
  .route("/")
  .post(checkauthorization, createTransaction)
  .get(getTransactions);

router
  .route("/:transactionId")
  .put(checkauthorization, checkStaffLevelPermissions, updateTransaction)
  .patch(
    checkauthorization,
    checkStaffLevelPermissions,
    updateTransactionStatus
  )
  .delete(checkauthorization, checkStaffLevelPermissions, deleteTransaction);

  router.route("/:transactionId/return").patch(checkauthorization, checkStaffLevelPermissions, returnBook);

export default router;