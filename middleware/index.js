const User = require("../models/user");
const Video = require("../models/video");

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", " You need to be logged in");
  res.redirect("/login");
};

middlewareObj.isAdmin = (req, res, next) => {
  if (!req.user) {
    req.flash("error", "Access Denied");
    res.redirect("/");
  } else if (req.user.role === "admin") {
    next();
  } else {
    req.flash("error", "Access Denied");
    res.redirect("/");
  }
};

middlewareObj.isSub = (req, res, next) => {
  if (!req.user) {
    req.flash("Please Sign In", "Access Denied");
    res.redirect("/login");
  } else if (req.user.role === "admin") {
    next();
  } else if (req.user.role === "subscriber") {
    next();
  } else {
    req.flash("error", "Access Denied");
    res.redirect("/");
  }
};

module.exports = middlewareObj;
