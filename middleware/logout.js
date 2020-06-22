module.exports = function (req, res, next) {
    if (req.session.currentUser) {
        return res.redirect("/logout");
    }
    next();
};