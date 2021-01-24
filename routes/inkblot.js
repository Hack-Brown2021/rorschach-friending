const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', checkLoggedIn, (req, res) => 
    res.render("inkblot"));

function checkLoggedIn(req, res, next) {
    if (!req.session.uid) {
        console.log("User is not logged in. Redirecting to login page.")
        res.status(403).redirect("/login");
        return;
    }
    next();
}

module.exports = router;