const express = require("express");

const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const User = require("./models/user.js");

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

const indexRoutes = require("./routes/index");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const videoRoutes = require("./routes/videos");

// ///////////////////////////////////////
// ////////Mongoose Setup/////////////////
// ///////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/battleground",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
// ///////////////////////////////////////
// ////////Passport Config////////////////
// ///////////////////////////////////////
app.use(require("express-session")({
  secret: "Oliver is so awesome",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// User.create({username:'logan', password:'dallalio'});

app.use("/", indexRoutes);
app.use("/", contactRoutes);
app.use("/", adminRoutes);
app.use("/", videoRoutes);

app.listen(8080, "localhost");
