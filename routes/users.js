const express = require("express");
const router = express.Router();
const protectRoute = require("./../middlewares/protectPrivateRoute");
const protectAdmin = require("./../middlewares/protectAdminRoute")
const userModel = require("./../models/User");
const pokeModel = require("./../models/Pokemon");
const uploader = require('./../config/cloudinary');

/* GET user page. */
router.get("/", protectRoute, (req, res, next) => {
  userModel
    .findOne({ email: req.session.currentuser.email })
    .populate("pokeFav")
    .then((dbRes) => {
      // console.log(dbRes);
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
      // console.log(dbRes);
      res.render("users/edit-my-page", dbRes);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/edit/:id", protectRoute, uploader.single("avatar"), (req, res, next) => {
  const { pseudo, email, region, avatar } = req.body;
  const newUser = { ...req.body };
  if (!req.file) newUser.avatar = undefined;
  else newUser.avatar = req.file.path;
  userModel
    .findByIdAndUpdate(req.params.id, newUser)
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



router.get("/delete/:id/pokemon", protectRoute, (req, res, next) => {
  pokeModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/edit/:id/pokemon", protectRoute, (req, res, next) => {
  pokeModel
    .findById(req.params.id)
    .then((pokemon) => {
      res.render("users/edit-pokemon-name",{ pokemon });
    })
    .catch((err) => {
      next(err);
    });
});


router.post("/edit/:id/pokemon", protectRoute, (req, res, next) => {
  pokeModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/users");
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
