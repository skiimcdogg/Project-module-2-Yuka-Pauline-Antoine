const express = require('express');
const router = express.Router();
const userModel = require("./../models/User");
const protectRoute = require("./../middlewares/protectPrivateRoute");

/* GET user page. */
router.get('/', protectRoute,  (req, res, next) => {
  userModel.findOne({email : req.session.currentuser.email})
    .then((dbRes)=> {
      console.log(dbRes)
      res.render("users/my-page", dbRes);
    })
    .catch((err) => {
      nexrt(err)
    })
})



module.exports = router;
