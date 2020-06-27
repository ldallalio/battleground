const express = require("express");
const fs = require("fs");
const middleware = require("../middleware/index");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;



const router = express.Router();

router.get("/subscription", (req, res) => {
  fs.readFile("items.json", (error, data) => {
    if (error) {
      res.status(500).end();
    } else {
      res.render("store.ejs", {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data),
      });
    }
  });
  res.locals.title = "The Battleground";
});

module.exports = router;
