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

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/addTransaction", tokenVerifier, addTransaction);
router.post("/addBudget", tokenVerifier, setBudget);
router.get("/transactions", tokenVerifier, getTransactions);
router.get("/budgets", tokenVerifier, getBudget);

router.get("/categories", tokenVerifier, getCategories);
router.post("/addCategory", tokenVerifier, addCategory);

export default router;
