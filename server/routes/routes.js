import express from "express";
import { login } from "../controllers/login.js";
import { register } from "../controllers/register.js";
import { tokenVerifier } from "../middlewares/tokenVerifier.js";
import { addTransaction } from "../controllers/addTransaction.js";
import { setBudget } from "../controllers/setBudget.js";
import { getTransactions } from "../controllers/getTransaction.js";
import { getBudget } from "../controllers/getBudget.js";
import { addCategory } from "../controllers/addCategory.js";
import { getCategories } from "../controllers/getCategories.js";
import { removeTransaction } from "../controllers/removeTransaction.js";
import { getAllUsers } from "../controllers/getAllUsers.js";
import { deleteUser } from "../controllers/deleteUser.js";
import { setRole } from "../controllers/setRole.js";
import { getAllTransactions } from "../controllers/getAllTransactions.js";
import { getAllUserBudget } from "../controllers/getAllUserBudget.js";
import { getAnalyticsOverview } from "../controllers/analyticsOverview.js";
import fileUploader from "../middlewares/fileUploader.js";
import { updateProfile } from "../controllers/updateProfile.js";
import { getUser } from "../controllers/getUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.put(
  "/updateProfile",
  tokenVerifier,
  fileUploader.single("img"),
  updateProfile
);
router.get("/user", tokenVerifier, getUser);

router.get("/users", tokenVerifier, getAllUsers);
router.delete("/deleteUser/:id", tokenVerifier, deleteUser);

router.get("/getAllTransactions", tokenVerifier, getAllTransactions);
router.get("/getAllUsersBudget", tokenVerifier, getAllUserBudget);

router.post("/updateRole/:id", tokenVerifier, setRole);

router.get("/admin/analytics/overview", tokenVerifier, getAnalyticsOverview);

router.post("/addTransaction", tokenVerifier, addTransaction);
router.delete("/deleteTransaction/:id", tokenVerifier, removeTransaction);
router.post("/addBudget", tokenVerifier, setBudget);
router.get("/transactions", tokenVerifier, getTransactions);
router.get("/budgets", tokenVerifier, getBudget);

router.get("/categories", tokenVerifier, getCategories);
router.post("/addCategory", tokenVerifier, addCategory);

export default router;
