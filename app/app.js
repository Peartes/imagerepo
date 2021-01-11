require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./lib/requestErrorHandler');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongo connection
require('./lib/mongo');

app.get('/', async (req, res) => {
  res.status(200).send('TutorMatcher is running');
});

app.get('/ping', async (req, res) => {
  res.status(200).send('Application is running');
});

// routes configuration
routes(app);

// error handling must be the last middleware
app.use(errorHandler);

module.exports = app;
