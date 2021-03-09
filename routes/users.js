const express = require('express');
const router = express.Router();
const userModel = require("./../models/User")

/* GET user page. */
router.get('/', function(req, res, next) {
  res.render('users/my-page');
});

module.exports = router;
