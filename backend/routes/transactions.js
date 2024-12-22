const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const { signOut, signin, signup } = require("../controllers/auth");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

// Protected routes with middleware
router.post("/add-income", authMiddleware, addIncome);
router.get("/get-incomes", authMiddleware, getIncomes);
router.delete("/delete-income/:id1", authMiddleware, deleteIncome);

router.post("/add-expense", authMiddleware, addExpense);
router.get("/get-expenses", authMiddleware, getExpense);
router.delete("/delete-expense/:id1", authMiddleware, deleteExpense);

// // Public routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", authMiddleware, signOut);

module.exports = router;
