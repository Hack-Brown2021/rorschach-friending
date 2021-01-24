const path = require('path')
const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "/")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {},
        resave: true,
        saveUninitialized: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hrs
    })
);

// db config
const db = require("./models");
try {
    // add comment block
    db.sequelize.sync();
    console.log('Database connected...')
} catch (err) {
    console.log('Unable to sync: ' + err);
}

// routes
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));
app.use('/inkblot', require('./routes/inkblot'));
app.use('/index', require('./routes/index'));
app.use('/summary', require('./routes/summary'));
app.use('/friend', require('./routes/friend'));

// listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;