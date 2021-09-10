const router = require("express").Router();
const bcrypt = require("bcrypt");

// models
const User = require("../models/User");

// sign up
router.post("/singup", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = new User({
      username,
      email,
      password: encryptPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// sign in
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: `Welcome ${user.username}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
