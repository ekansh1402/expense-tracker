const ExpenseSchema = require("../models/ExpenseModel");
const User = require("../models/UserModel");

exports.addExpense = async (req, res, next) => {
  const { title, amount, category, description, date } = req.body;
  const id = req.id;
  const income = ExpenseSchema({
    id,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    const newIncome = await income.save();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { expense: newIncome._id } },
      { new: true }
    );
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getExpense = async (req, res, next) => {
  try {
    id = req.id; // Assuming you are passing userId in the request body

    // Fetch the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the expenses using the IDs stored in user's expense array
    const expenses = await ExpenseSchema.find({
      _id: { $in: user.expense },
    }).sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id1 } = req.params;
    const id = req.id;
    const expense = await ExpenseSchema.findByIdAndDelete(id1);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { expense: id1 } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "Expense Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
