const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  addToCart,
  updateQuantity,
  getItemById,
  getActiveCartItems,
  getItemsByOrderId,
  removeFromCart,
} = require("./order_items"); // import your functions from order_items.js

//TAHJ//

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// GET all cart items
router.get("/api/order_items", verifyToken, async (req, res) => {
  try {
    const activeCart = await getActiveCartItems(req.user.customer_id);
    res.json(activeCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET cart items by order id
router.get("/api/order_items/:order_id", verifyToken, async (req, res) => {
  try {
    const order = await getItemsByOrderId(req.params.order_id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add item to cart
router.post("/api/order_items", verifyToken, async (req, res) => {
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
router.patch("/api/order_items/:id", verifyToken, async (req, res) => {
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
router.delete("/api/order_items/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCart = await removeFromCart(id, req.user.customer_id);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
