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
  return res.status(201).json({
    message: "User Registered Successfully.",
    user: user,
  });
}
async function getLoginController(req, res) {
  res.render("login");
}
async function postLoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.find({
    email: email,
  });

  if (!user) {
    return res.redirect("/login?error=User Not Found!");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  return res.status(200).json({
    message: "User LoggedIn Successfully.",
    user: user,
  });
}
module.exports = {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
};
