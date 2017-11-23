// BASE SETUP
// =======================================================================

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Magic happens on port ${port}`);
