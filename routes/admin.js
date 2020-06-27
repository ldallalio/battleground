const express = require("express");
const middleware = require("../middleware/index");

const router = express.Router();

router.get("/admin", middleware.isAdmin, (req, res) => {
    res.locals.title = "The Battleground";
  res.render("dashboard.ejs");
});

module.exports = router;
