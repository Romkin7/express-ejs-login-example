const express = require('express');
const router = express.Router();
const passport = require("passport");
const passportConf = require('../../passport');
const db = require('../../models');
router.get("/profiili", (req, res) => {
	return res.render("auth/profiili");
});
router.get("/signup", (req, res, next) => {
	res.render("auth/signup");
});
router.post("/signup", async(req, res, next) => {
	try {
		let user = new db.User();
		user.email = req.body.email;
		user.password = req.body.password;
		const newUser = await user.save();
		console.log(newUser);
		return res.redirect("/login");
	} catch(err) {
		return next(err);
	}
});
router.get("/login", (req, res, next) => {
	res.render("auth/login");
});
router.post("/login", passport.authenticate('local', {
  	successRedirect: '/profiili',
  	failureRedirect: '/login',
  	failureFlash: true
}));
module.exports = router;