const express        = require("express");

const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const methodOverride = require("method-override");
const flash          = require("connect-flash");
const User           = require("./models/user.js");
const Video          = require("./models/video");
const seedDB = require('./seed.js');

//seedDB();

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());


// ///////////////////////////////////////
// ////////BodyParser Setup///////////////
// ///////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));

const indexRoutes = require("./routes/index");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const videoRoutes = require("./routes/videos");
// ///////////////////////////////////////
// ////////Mongoose Setup/////////////////
// ///////////////////////////////////////

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

mongoose.connect("mongodb://localhost:27017/battleground",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });


 //User.create({username:'admin', password:'pass', admin: 1});
 //console.log(User.find({}));

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

// Passes currentUser and messages to all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/", contactRoutes);
app.use("/", adminRoutes);
app.use("/", videoRoutes);

app.listen(process.env.PORT || 3030, process.env.IP || "127.0.0.1", () => {
  console.log(`Server Starting at: http://${process.env.IP || "127.0.0.1"}:${process.env.PORT || 3030}`);
});
