const express    = require('express');
const mongoCli   = require('mongodb');
const bodyParser = require('body-parser');
const app        = express(); 
const port       = process.env.port || 8080;
const DB         = require('./config/db');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoCli.connect(DB.url, (err, database) => {
    if (err) throw err;
    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log(`We are listen ${port}`);
    });
});