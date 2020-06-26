const express = require("express");
const fs = require("fs");
const middleware = require("../middleware/index");

const router = express.Router();

router.get("/subscription", (req, res) => {
  fs.readFile("items.json", (error, data) => {
    if (error) {
      res.status(500).end();
    } else {
      res.render("store.ejs", {
        items: JSON.parse(data),
      });
    }
  });
});

module.exports = router;
