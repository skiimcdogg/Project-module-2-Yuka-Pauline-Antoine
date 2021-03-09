const express = require('express');
const router = express.Router();
const protectRoute = require("./../middlewares/protectPrivateRoute");
const userModel = require("./../models/User");
const pokeModel = require('./../models/Pokemon');

/* GET user page. */
router.get('/', protectRoute,  (req, res, next) => {
  userModel.findOne({user : req.session.currentuser})
    .then((dbRes)=> {
      console.log(dbRes)
      res.render("users/my-page", dbRes);
    })
    .catch((err) => {
      nexrt(err)
    })
})



module.exports = router;
