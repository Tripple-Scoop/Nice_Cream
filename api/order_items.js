//TAHJ//
const express = require("express");
const orderItemsRouter = express.Router();
const {
  addToCart,
  updateQuantity,
  getItemById,
  getActiveCartItems,
  getItemsByOrderId,
  removeFromCart,
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

// GET cart items by order id
orderItemsRouter.get("/:order_id", async (req, res) => {
  try {
    const order = await getItemsByOrderId(req.params.order_id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add item to cart 
orderItemsRouter.post("/", async (req, res) => {
  const { customer_id, flavor_id, quantity } = req.body;
  try {
    const cartItem = await addToCart({
      customer_id,
      flavor_id,
      quantity,
      order_id: null,
    });
    res.json(cartItem);
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE remove item from cart
orderItemsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCart = await removeFromCart(id, req.user.id);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = orderItemsRouter;
