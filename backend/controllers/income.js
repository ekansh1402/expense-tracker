const IncomeSchema = require("../models/IncomeModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
exports.addIncome = async (req, res, next) => {
  const { title, amount, category, description, date } = req.body;
  const id = req.id;

  const income = IncomeSchema({
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
      { $push: { income: newIncome._id } },
      { new: true }
    );
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res, next) => {
  try {
    const id = req.id; // Consistent naming with the route.
    console.log(id);
    // Cast `id` to ObjectId.
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid User ID" });
    // }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch incomes linked to the user.
    const incomes = await IncomeSchema.find({
      _id: { $in: user.income },
    }).sort({ createdAt: -1 });
    // console.log(incomes);
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res, next) => {
  try {
    const { id1 } = req.params;
    const id = req.id;

    const income = await IncomeSchema.findByIdAndDelete(id1);
    if (!income) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { income: id1 } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "income Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
