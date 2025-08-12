const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getRegisterController(req, res) {
  res.render("register");
}

async function postRegisterController(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserExists) {
    return res.status(400).json({
      message: "User Already Exists With This Email or Username",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
}

module.exports = {
  getRegisterController,
  postRegisterController,
};
