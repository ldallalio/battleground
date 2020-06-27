const express = require("express");

const router = express.Router();

router.get("/contact", (req, res) => {
    res.locals.title = "The Battleground";
  res.render("contact");
});

module.exports = router;
