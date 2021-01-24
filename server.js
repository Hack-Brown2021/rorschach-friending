const path = require('path')
const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const {spawn} = require('child_process');
require('dotenv').config();

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "/")));
app.use(
    session({
        secret: 'secret',
        cookie: {},
        resave: true,
        saveUninitialized: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hrs
    })
);

// db config
/* const db = require("./models");
try {
<<<<<<< HEAD
    // add comment block
    db.sequelize.sync({alter: true});
=======
    db.sequelize.sync(/*{alter: true});
>>>>>>> a85d31b7f99b3b4fd153a307f764cb5e7dfee95d
    console.log('Database connected...')
} catch (err) {
    console.log('Unable to sync: ' + err);
}
*/

/*
app.get('/', (req, res) => {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['script1.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
});
*/

// routes
app.use("/", require('./routes'));
app.use('/users', require('./routes/users'));
app.use('/inkblot', require('./routes/inkblot'));
app.use('/index', require('./routes/index'));
app.use('/summary', require('./routes/summary'));

// listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;