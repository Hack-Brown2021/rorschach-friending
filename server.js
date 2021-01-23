
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

// listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;