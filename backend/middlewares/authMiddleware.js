const jwt = require("jsonwebtoken");
const User = require("../models/UserModel"); // Import your User model
const errorHandler = require("./error");
exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("cookie", req.cookies);
  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = "Unauthorized";
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error();
      error.status = 401;
      error.message = "Unauthorized";
      return next(error);
    }
    console.log(user);
    req.id = user.id;

    next();
  });
};
