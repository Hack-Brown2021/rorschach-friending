const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => 
    models.User.findAll()
        .then(users => {
            console.log(users);
            res.sendStatus(200);
        })
        .catch(err => console.log(err)));

module.exports = router;