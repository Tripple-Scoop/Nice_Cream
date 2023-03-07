const express = require('express');
const router = express.Router();
const { getUserById } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


// 'test push'

// router.use(async (req, res, next) => {
//   const prefix = 'Bearer ';
//   const auth = req.header('Authorization');
//   // console.log('middleware called');
//   if (!auth) { // nothing to see here
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);
//     // console.log(token);
//     try {
//       const { id } = jwt.verify(token, JWT_SECRET);
//       // console.log(id);
//       if (id) {
//         req.user = await getUserById(id);
//         // console.log(req.user);
//         next();
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: 'AuthorizationHeaderError',
//       message: `Authorization token must start with ${prefix}`
//     });
//   }
// });


// router.use((req, res, next) => {
//   if (req.user) {
//     console.log("User is set:", req.user);
//   }

//   next();
// });


// GET /api/health
router.get('/health', async (req, res) => {
  res.send({
    message: "All is good."
  })
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const flavorsRouter = require('./flavors');
router.use('/flavors', flavorsRouter);

// // ROUTER: /api/routines
// const reviewsRouter = require('./reviews');
// router.use('/reviews', reviewsRouter);

// // ROUTER: /api/routine_activities
// const ordersRouter = require('./orders');
// router.use('/orders', ordersRouter);

// const orderItemsRouter = require('./order_items');
// router.use('/order_items', orderItemsRouter);

//general error handler
router.use((error, req, res, next) => {
  res.send(error);
});

module.exports = router;
//test push