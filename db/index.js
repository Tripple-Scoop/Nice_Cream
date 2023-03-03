const client = require("./client");

module.exports = {
  client,
  ...require('./users'), // adds key/values from users.js
  ...require('./flavors'), // adds key/values from flavors.js
  ...require('./reviews'), // etc
  ...require('./orders'), // etc
  ...require('./order_items') // etc
}