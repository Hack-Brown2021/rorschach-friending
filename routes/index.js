const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const router = express.Router();
var models = require("../models");
const {spawn} = require('child_process');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/logout', (req, res) => {
    req.session.uid = null;
    req.session.name = null;
    req.session.email = null;
    req.session.matches = null;
    req.session.inkwords = null;
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/login', urlencodedParser, async function (req, res) {
    console.log(req.body);
    let user = await models.User.findOne({where: {email : req.body.email}});

    // Check account found and verify password
    if (!user || (req.body.password !== user.password)) {
        console.error("Email does not exist, or password is incorrect.");
        res.redirect('/login');
    } else {
        // Save user data fields into session
        req.session.uid = user.id;
        req.session.name = user.name;
        req.session.email = user.email;
        req.session.matches = user.matches;
        req.session.inkwords = user.inkwords;

        console.log("User " + req.session.name + " successfully logged in!")
        console.log("req.session.uid = " + req.session.uid);

        if (!req.session.matches) {
            res.status(200).redirect('/inkblot');
        } else {
            res.status(200).redirect('/friend');
        }
    }
});

router.post('/register', urlencodedParser, async function (req, res) {
    console.log(req.body);
    let emailExists = await models.User.findOne({raw : true, where: {email : req.body.email}});

    if (emailExists) {
        console.log("A user with that email already exists.");
        res.status(501).redirect('/login');
    } else {
        // create a new user in the database
        models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(async function(user)  {
            req.session.name = req.body.name;
            req.session.email = req.body.email;

            const tryGetUid = await models.User.findOne({order: [ [ 'createdAt', 'DESC' ]]});
            req.session.uid = tryGetUid.id;

            console.log("User successfully created!")
            console.log("req.session.uid = " + req.session.uid);
            res.status(200).redirect('/inkblot');
        });
    };
});

router.get('/pytest', (req, res) => {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', [path.join(__dirname, "/script1.py")]);
    // collect data from script
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script...');
     dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
});

module.exports = router;