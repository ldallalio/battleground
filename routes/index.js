const express = require("express");
const stripe = require("stripe")("sk_test_51GweyYHSu42CQXjlmjZPZ7QzwGHgydTroKtT9eNRi9NGkdaRnTPN6e5OiXqHbNg4dHUY5dax7HJuzf2vxGWtdYWS00YIfFGNk0", { apiVersion: "" });

const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("index");
});

// Show Login Form
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}), (req, res) => {});

// Signup Logic
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const newUser = new User({ username: req.body.username, email: req.body.email });
  
  const customer = stripe.customers.create({
    name: `${req.body.firstName} ${req.body.lastName}`,
    email: req.body.email,
  });



 
  
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });

});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged You Out!");
  res.redirect("/");
});
module.exports = router;



