const express = require("express");
const orderRouter = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  submitOrder,
  getOrdersByCustomer,
} = require("../db");

//GET all orders
orderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while getting all orders");
  }
});

//GET order by ID
orderRouter.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).send(`Order with ID ${orderId} not found.`);
    }
    res.send(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`An error occurred while getting order with ID ${req.params.id}`);
  }
});

//UPDATE order status
orderRouter.patch("/orders/:id", async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { fulfilled } = req.body;
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).send(`Order with ID ${orderId} not found.`);
    }
    const updatedOrder = await submitOrder(orderId);
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});

//POST new order
orderRouter.post("/orders", async (req, res) => {
  try {
    const {
      customer_id,
      date,
      billing_address,
      shipping_address,
      total,
      payment_type,
    } = req.body;
    const newOrder = await createOrder({
      customer_id,
      date,
      billing_address,
      shipping_address,
      total,
      payment_type,
    });
    res.send(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating a new order");
  }
});

//GET orders by customer ID
orderRouter.get("/orders/customer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const orders = await getOrdersByCustomer(customerId);
    if (!orders.length) {
      return res
        .status(404)
        .send(`Orders with customer ID ${customerId} not found.`);
    }
    res.send(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        `An error occurred while getting orders with customer ID ${req.params.id}`
      );
  }
});

module.exports = orderRouter;
