const express = require("express");

const route = express.Router();

const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

route.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let exisit = await User.findOne({ email });
    if (exisit) res.status(400).json({ message: "user already exists" });

    let hashedpassword = await bcrypt.hash(password, 10);
    let user = new User({ email, password: hashedpassword, role });
    await user.save();
    res.status(201).json({ message: "user register" });
  } catch (error) {
    res.status(500).json({ message: `server error ${error}` });
  }
});
route.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invaild user" });
    let Match = await bcrypt.compare(password, user.password);
    if (!Match) return res.status(400).json({ message: "invaild user" });
    console.log(user.role);

    const token = jwt.sign(
      { userId: user.id, role: user.role || "user" },
      process.env.secretkey,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.log(`server error 500 ${error}`);
  }
});

module.exports = route;
