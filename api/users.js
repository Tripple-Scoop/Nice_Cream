const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
// import { requireUser } from "./utils";
const {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getOrdersByCustomer,
  getItemsByOrderId,
  getFlavorById,
  getAllOrders,
  updateUser,
  addAdminPerms,
  removeAdminPerms,
  getReviewsByUser,
} = require("../db");
const { requireUser, requireAdmin } = require("./utils");
const SALT_COUNT = 10;
const { JWT_SECRET } = process.env;

//GET /users

usersRouter.get("/all", requireAdmin, async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    throw error;
  }
});

/*
POST api/users/register
parameters, (username, password)
should do the following:
- returns user object (id, username)
- returns message, the success message
- sets 'userToken' into local storage
*/

usersRouter.post("/register", async (req, res, next) => {
  const { name, username, password, address } = req.body;
  const queriedUser = await getUserByUsername(username);

  // console.log('The username:', username)
  // console.log('The password:', password)

  try {
    const _user = await getUserByUsername(username);

    // console.log('_user:', _user)

    if (_user) {
      // console.log('user already exists!')
      next({
        error: "Error",
        name: "UserExistsError",
        message: `The username ${username} is already taken.`,
      });
    } else if (password.length < 8) {
      // console.log('password is to short!')
      next({
        error: "PasswwordLengthError",
        message: "You password must be eight characters or longer",
        name: "PasswordLengthError",
      });
    }

    const user = await createUser({ name, username, password, address });
    // console.log("this is the user", user)

    const token = jwt.sign(
      {
        id: user.id,
        username: username,
        password: password,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    // console.log('this is the token:', token)

    res.send({
      message: "Thank you for signing up!",
      token: token,
      user: user,
    });
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

  console.log("Inside /login endpoint: ", username, password);
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

usersRouter.get("/me", async (req, res, next) => {
  const user = req.user;
  if (user) {
    res.send(user);
  } else {
    res.status(401);

    res.send({
      error: "error",
      message: "You must be logged in to perform this action",
      name: "error",
    });
  }
});

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

usersRouter.get("/:username/orders", requireUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    // console.log(`User from users.js: ${user}`);
    const userOrders = await getOrdersByCustomer(user.id);
    console.log("user orders: ", userOrders);

    let result = [];
    //map through user orders and attach order_items to the matching order number
    for (let i = 0; i < userOrders.length; i++) {
      const order = userOrders[i];
      const orderItems = await getItemsByOrderId(order.id);
      for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        orderItems[i].flavor_info = await getFlavorById(item.flavor_id);
      }

      order.items = orderItems;
      console.log("order logged: ", order);
      result.push(order);
    }

    console.log("final result", result);
    res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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

usersRouter.get("/:username/reviews", requireUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    // console.log(`User from users.js: ${user}`);
    const userReviews = await getReviewsByUser({ userId: user.id });
    console.log("user reviews: ", userReviews);

    let result = {
      user_id: user.id,
      name: user.name,
      username: user.username,
      reviews: userReviews,
    };
    // //map through user orders and attach order_items to the matching order number
    for (let i = 0; i < result.reviews.length; i++) {
      const review = userReviews[i];
      const flavor = await getFlavorById(review.flavor_id);
      review.flavor_info = flavor;
      // console.log('review logged: ',review);
      // result.push(order);
    }

    //
    // console.log({result});
    res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/*
PATCH  /:username
 */

usersRouter.patch("/:userId", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { id, ...fields } = req.body;
    const user = getUserByUsername(username);

    const canEdit = userId === user.id;

    if (!canEdit) {
      throw {
        error: "error",
        message: `User is not allowed to update this profile. Please log in as the correct user.`,
        name: `error`,
      };
    }
    const updatedUser = await updateUser({ id: id, ...fields });
    // console.log("updatedRoutineActivity:", updatedRoutineActivity)
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
