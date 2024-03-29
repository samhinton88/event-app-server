const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// database address
const { mongoUri } = require('./config/keys');


mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);

const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: '5mb'}));
app.use(morgan('dev'));


require('./routes')(app);


const port = 5000;

app.listen(process.env.PORT || port)
