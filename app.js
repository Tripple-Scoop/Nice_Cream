require("dotenv").config()
const express = require("express")
var cors = require('cors')
var app = express()

const morgan = require('morgan');

const { client } = require('./db');
const PORT = process.env["PORT"] || 5000;

client.connect();
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


const router = require('./api');
app.use('/api', router);



app.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT, "Get your Ice Cream on!");
});

module.exports = app;




