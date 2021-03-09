module.exports = function protectPrivateRoute(req, res, next) {
    if (req.session.currentuser) next();
    else res.redirect("/signin");
};