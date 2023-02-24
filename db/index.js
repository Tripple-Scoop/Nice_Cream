const client = require("./client");

module.exports = {
  
  ...require('./users'), // adds key/values from users.js
  ...require('./flavors'), // adds key/values from activites.js
  ...require('./orders'), // etc
  ...require('./cart') // etc
}