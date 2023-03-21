//TAHJ//

const express = require("express");
const orderItemsRouter = express.Router();
const { getUserByUsername } = require("../db/users");
const { getOrdersByCustomer } = require("../db/orders");
const { getFlavorById } = require("../db/flavors");
const {
  addToCart,
  updateQuantity,
  getItemById,
  getActiveCartItems,
  getItemsByOrderId,
  removeFromCart,
  duplicateItems,
} = require("../db/order_items"); // import your functions from order_items.js
const { requireUser } = require("./utils");

// GET all cart items
orderItemsRouter.get("/", async (req, res) => {
  try {
    const activeCart = await getActiveCartItems(req.user.id);
    res.json(activeCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ACTIVE CART
orderItemsRouter.get("/:customer_id", async (req, res) => {
  try {
    const activeCart = await getActiveCartItems(req.params.customer_id);
    res.json(activeCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add item to cart
orderItemsRouter.post("/", async (req, res) => {
  const { flavor_id, quantity, order_id, customer_id } = req.body;
  try {
    const cartItem = await addToCart({
      flavor_id: flavor_id,
      quantity: quantity,
      order_id: order_id,
      customer_id: customer_id,
    });
    console.log("CART ITEM", cartItem);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET all cart items
orderItemsRouter.get("/customer/:id", async (req, res) => {
  try {
    const duplicateCartItems = await duplicateItems(req.params.customer_id);
    res.json(duplicateCartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// PATCH update quantity of cart item
orderItemsRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newQuant = req.body.quantity;
  try {
    const newQuantity = await updateQuantity(id, newQuant);
    res.json(newQuantity);
    console.log("ROUTE..", newQuantity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE remove item from cart
orderItemsRouter.delete("/:flavor_id", async (req, res) => {
  const flavor_id = req.params.flavor_id;
  console.log("this is an id", flavor_id);
  try {
    const updatedCart = await removeFromCart(flavor_id);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

orderItemsRouter.get("/:username/cart", requireUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    // console.log(`User from users.js: ${user}`);
    const userOrders = await getOrdersByCustomer(user.id);
  
    // console.log("user orders: ", userOrders);

    let result = null
    //map through user orders and attach order_items to the matching order number
    for (let i = 0; i < userOrders.length; i++) {
      const order = userOrders[i];
      if (!order.fulfilled) {
        const orderItems = await getItemsByOrderId(order.id);
        for (let i = 0; i < orderItems.length; i++) {
          const item = orderItems[i];
          orderItems[i].flavor_info = await getFlavorById(item.flavor_id);
        }
        order.items = orderItems;
        // console.log("order logged: ", order);
        result = order;
      }
    }

    // console.log("final result", result);
    res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = orderItemsRouter;
