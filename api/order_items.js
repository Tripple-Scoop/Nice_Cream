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
  duplicateItems,
} = require("../db/order_items"); // import your functions from order_items.js
const { requireUser } = require("./utils");

// GET all cart items
// orderItemsRouter.get("/", async (req, res) => {
//   try {
//     const activeCart = await getActiveCartItems(req.user.id);
//     res.json(activeCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
