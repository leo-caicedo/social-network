const router = require("express").Router();
const bcrypt = require("bcrypt");

// models
const User = require("../models/User");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { password, updatedAt, ...other } = user._doc;
    res.json(other);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can update only your account!" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (req.body.userId === id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can delete only your account!" });
  }
});

module.exports = router;
