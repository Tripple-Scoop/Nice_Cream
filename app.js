require("dotenv").config()
const express = require("express")
var cors = require('cors')
var app = express()

const morgan = require('morgan');

// Setup your Middleware and API Router here

app.use(morgan('dev'));
app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });


// const router = require('./api');
// app.use('/api', router);

const { client } = require('./db');
client.connect();


module.exports = app;
