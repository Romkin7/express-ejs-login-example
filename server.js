require('./dbConnection');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const errorHandler = require('./handlers/error');
const app = express();

const authRoutes = require('./routes/auth');

app.set("port", process.env.PORT || 5000);
app.set("view engine", "ejs");

// setup middleware dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET || "some random jibrish rpietjioetueotueoiu56u6i4564%&¤%¤%etgdfgd",
    resave: false,
    saveUninitialized: false,
    //store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 86400000}
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Local variables
app.use(function(req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.use("/", authRoutes);

app.use(errorHandler);

app.listen(app.get("port"), () => {
	console.log(`App is running on port ${app.get("port")}`);
});