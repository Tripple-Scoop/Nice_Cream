
const { Client } = require('pg') // imports the pg module

require('dotenv').config();
const { DATABASE_URL } = process.env;
console.log(DATABASE_URL)
const client = new Client(DATABASE_URL);
console.log(client);
module.exports = client;

