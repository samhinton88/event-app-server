const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// database address
const { mongoUri } = require('./config/keys');
console.log(mongoUri)
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./routes')(app);

const port = 5000;

app.listen(process.env.PORT || port)
