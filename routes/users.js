const express = require("express");
const router = express.Router();
const protectRoute = require("./../middlewares/protectPrivateRoute");
const protectAdmin = require("./../middlewares/protectAdminRoute")
const userModel = require("./../models/User");
const pokeModel = require("./../models/Pokemon");

/* GET user page. */
router.get("/", protectRoute, (req, res, next) => {
  userModel
    .findOne({ email: req.session.currentuser.email })
    .then((dbRes) => {
      console.log(dbRes);
      res.render("users/my-page", dbRes);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/edit/:id", protectRoute, (req, res, next) => {
  userModel
    .findOne({ email: req.session.currentuser.email })
    .then((dbRes) => {
      console.log(dbRes);
      res.render("users/edit-my-page", dbRes);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/edit/:id", protectRoute, (req, res, next) => {
  const { pseudo, email, region } = req.body;
  userModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/delete/:id", protectRoute, (req, res, next) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

/* GET the users page. */

router.get("/all", protectAdmin, (req, res, next) => {
  userModel
    .find()
    .then((users) => {
      res.render("users/all-users", {users});
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/adminDelete/:id", protectAdmin, (req, res, next) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/users/all");
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
