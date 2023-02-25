const client = require("./client");

module.exports = {
  ...require('./client'), // etc
  ...require('./users'), // adds key/values from users.js
  ...require('./flavors'), // adds key/values from flavors.js
  ...require('./reviews'), // etc
  ...require('./orders'), // etc
  ...require('./cart_items') // etc
}