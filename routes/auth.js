const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signin", (req, res, next) => {
  res.render("pokemons/signin");
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });

    if (!foundUser) {
      res.redirect("/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, founUser.password);

      if (!isSamePassword) {
        res.redirect("/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;

        req.session.currentuser = userObject;

        res.redirect("/");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foudUser = await UserModel.findOne({email : newUser.email});

    if(foundUser) {
        res.redirect("/signin");
    } else {
        const hashedPassword = bcrypt.hashSync(newuser.pssword, 10);
        newUser.password = hashedPassword;

        await UserModel.create(newUser);
        res.redirect("/signin")
    }
  } catch(err) {
      next(err)
  }
});

router.get("/signout", (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect("/")
    })
});

module.exports = router;
