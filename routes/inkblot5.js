const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => 
    res.render("inkblot5"));

module.exports = router;