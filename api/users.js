const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
  addAdminPerms,
  removeAdminPerms
} = require("../db");
const SALT_COUNT = 10;
const { JWT_SECRET } = process.env;



/*
POST api/users/register
parameters, (username, password)
should do the following:
- returns user object (id, username)
- returns message, the success message
- sets 'userToken' into local storage
*/



/*
POST api/users/login
parameters, (username, password)
should do the following:
-returns user object (id, username)
-returns message, the success message
-sets 'userToken' into local storage
*/

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, message: "you're logged in!", token });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/*
GET /api/users/me
NO PARAMETERS
returns user object(id, username)
*/

/* GET /api/users/:username/orders
current user's username must match customer_id
returns array of objects (orders)
EXAMPLE:
[
    {
      id:3,
      customer_id: 4,
      date: '2022-05-05 07:00:00',
      billing_address: '321 Example Ct.',
      shipping_address: '321 Example Ct.',
      total: 200,
      payment_type: 'Klarna',
      fulfilled: true
      order_items: [
        {
          customer_id: 4,
          flavor_id: 3,
          order_id: 3,
          quantity: 3
        },
        {
          customer_id: 4,
          flavor_id: 1,
          order_id: 3,
          quantity: 1
      }
        ]
    }
]
*/

/* GET /api/users/:username/reviews
current user's username must match customer_id
returns array of objects of reviews created by the user (reviews) 
EXAMPLE:
[
  {
    id:2,
    username: 'bobthesnob',
    reviews: [
        {
        flavor_id: 1,
        author_id: 2,
        title: "Chocolate rules",
        content: "Meh.",
      },
      {
        flavor_id: 2,
        author_id: 2,
        title: "Vanilla is okay",
        content: "I can not see the vanilla bean! What gross factory did this come from? I need answers",
      }]
  }
]
*/