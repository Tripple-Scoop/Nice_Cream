const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
import { requireUser } from "./utils";
const {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getOrdersByCustomer,
  getItemsByOrderId,
  updateUser,
  addAdminPerms,
  removeAdminPerms,
  getReviewsByUser,
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

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queriedUser = await getUserByUsername(username);

    if (queriedUser) {
      res.status(401);
      next({
        name: "Error",
        message: `User ${username} is already taken.`,
      });
      return;

    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordLengthError",
        message: "Password Too Short!",
      });
      return;

    } else {
      const user = await createUser({
        username,
        password,
      });
      if (!user) {
        next({
          name: "UserCreationError",
          message: "There was a problem registering you. Please try again.",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch (error) {
    next(error);
  }
});


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
    console.error(error);
    next(error);
  }
});

/*
GET /api/users/me
NO PARAMETERS
returns user object(id, username)
*/

usersRouter.get('/me', requireUser, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userObj = getUser(username, password);
    res.send(userObj);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

/*
GET /api/users/:username/orders
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

usersRouter.get('/:username/orders', requireUser, async (req, res, next) => {
  const { username } = req.params;
  const user = getUserByUsername(username);
  const userOrders = getOrdersByCustomer(user.id);
  try {
    //map through user orders and attach order_items to the matching order number
    userOrders.map(order => {
      order.order_items = getItemsByOrderId(order.id);
    })
    res.send(userOrders);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

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
        title: "Mediocre at Best...",
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

usersRouter.get('/:username/reviews', requireUser, async (req, res, next) => {
  const { username } = req.params;
  const user = getUserByUsername(username);
  const userReviews = getReviewsByUser(user.id);
  try {
    //map through user orders and attach order_items to the matching order number
    userReviews.reviews = userReviews;
    res.send(userReviews);
  } catch (error) {
    console.error(error);
    next(error);
  }
})








