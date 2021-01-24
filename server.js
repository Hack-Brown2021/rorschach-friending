
const path = require('path')
const express = require('express');
const exphbs  = require('express-handlebars');
require('dotenv').config();

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "/")));
app.get('/', (req, res) => {
    res.render('index');
});

// db config
/* const db = require("./models");
try {
    db.sequelize.sync(/*{alter: true});
    console.log('Database connected...')
} catch (err) {
    console.log('Unable to sync: ' + err);
}
*/

// user routes
app.use('/users', require('./routes/users'));
app.use('/inkblot', require('./routes/inkblot'));
app.use('/index', require('./routes/index'));
app.use('/summary', require('./routes/summary'));
app.use('/friend', require('./routes/friend'));

// listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;