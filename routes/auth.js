const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signin", (req, res, next) => {
  res.render("users/signin");
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });

    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);

      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;

        req.session.currentuser = userObject;
        req.flash("success", "Successfully logged in...");
        res.redirect("/users");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({email : newUser.email});

    if(foundUser) {
      req.flash("warning", "Email already registered");
        res.redirect("/signin");
    } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;

        await UserModel.create(newUser);
        req.flash("success", "Congrats ! You are now registered !");
        res.redirect("/signin")
    }
  } catch(err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/users/signup");
  }
});

router.get("/signout", (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect("/")
    })
});

module.exports = router;
