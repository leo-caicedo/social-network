const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "welcome to auth routes" });
});

module.exports = router;
