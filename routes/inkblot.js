const express = require('express');
const router = express.Router();
const models = require('../models');

<<<<<<< HEAD
router.get('/inkblot', checkLoggedIn, (req, res) => {
    res.render("inkblot");
});
    
router.get('/inkblot2', (req, res) => {
    res.render("inkblot2");
});
=======
router.get('/inkblot', /*checkLoggedIn,*/ (req, res) => 
    res.render("inkblot"));
>>>>>>> 3e69e2f43db2d5c55d057648fcdcaabc19fea89c

router.get('/inkblot3', (req, res) => { 
    res.render("inkblot3");
});

router.get('/inkblot4', (req, res) => {
    res.render("inkblot4");
});

router.get('/inkblot5', (req, res) => {
    res.render("inkblot5");
});

function checkLoggedIn(req, res, next) {
    if (!req.session.uid) {
        console.log("User is not logged in. Redirecting to login page.")
        res.status(403).redirect("/login");
        return;
    }
    next();
}

module.exports = router;