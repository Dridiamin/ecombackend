const mongoose = require("mongoose");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
exports.userRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const currEmail = await User.findOne({ email: email });
    if (currEmail)
      return res.status(400).json({ message: "this email is already exist" });
    const hashPass = await bcrypt.hash(password, 10);
    req.body.password = hashPass;
    const user = await User.create(req.body);
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 day",
    });
    res.json({ user, token, message: "user created with success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error server", stack: error.message });
  }
};

// login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(404).json({ message: " Wrong password ! " });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 day",
    });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json("error server", error.message);
  }
};

// get profile
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(500).json("error server", error.message);
  }
};

// update Profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { firstName, lastName, password } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) user.password = await bcrypt.hash(password, 10);
    const newUser = await user.save();
    res.json({ message: " User save with success", newUser });
  } catch (error) {
    res.status(500).json("error server", error.message);
  }
};
