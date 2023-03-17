//TAHJ//
const client = require("./client");

//addToCart(customer_id, flavor_id, quantity)- returns cart item object

async function addToCart({ customer_id, flavor_id, quantity, order_id }) {
  try {
    const {
      rows: [inCart],
    } = await client.query(`
    SELECT * FROM order_items 
    WHERE customer_id = ${customer_id} AND flavor_id = ${flavor_id} AND order_id =${order_id};`);
    if (inCart) {
      console.log("IN CART", inCart);
      const updateC = await updateQuantity(
        inCart.id,
        inCart.quantity + quantity
      );
      console.log("1U", updateC);
      return await updateQuantity(inCart.id, inCart.quantity + quantity);
    }
    const {
      rows: [order_item],
    } = await client.query(
      `INSERT INTO order_items(customer_id, flavor_id, quantity, order_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
      [customer_id, flavor_id, quantity, order_id]
    );
    console.log("ORDER ITEM", order_item);
    return order_item;
  } catch (error) {
    console.error(error, "Error with Duplicate Items");
    throw error;
  }
}

//updateQuantity(cart_item.id, newQuant)- allow to quantity of flavor
async function updateQuantity(id, newQuant) {
  try {
    const {
      rows: [newQuantity],
    } = await client.query(
      `UPDATE order_items
        SET quantity = $1
        WHERE id = $2
        RETURNING *;
        `,
      [newQuant, id]
    );
    console.log("QUANT RETURN", newQuantity);
    return newQuantity;
  } catch (error) {
    console.error(`Error updating quantity ${id}!`, error);
  }
}

//getItemById(cart_item_id)- return cart_item based on it's id
async function getItemById(id) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `SELECT *
         FROM order_items
         WHERE id = $1;
         `,
      [id]
    );
    return item;
  } catch (error) {
    console.error(`Error retrieving item with id ${id}!`, error);
  }
}

//getActiveCartItems(customer_id)- return array of cart_items in customer's unsubmitted order
async function getActiveCartItems(customer_id) {
  try {
    const { rows: activeCart } = await client.query(
      `SELECT *
            FROM order_items
            WHERE customer_id = $1
            AND order_id IS NULL
            `,
      [customer_id]
    );
    return activeCart;
  } catch (error) {
    console.error(`Error retrieving cart with id ${customer_id}!`, error);
  }
}

//getItemsByOrderId(order_id)- return array of cart_items for given order_id
async function getItemsByOrderId(order_id) {
  try {
    const { rows: orders } = await client.query(
      `SELECT *
              FROM order_items
              WHERE order_id = $1;
              `,
      [order_id]
    );
    return orders;
  } catch (error) {
    console.error(`Error retrieving order with id ${order_id}!`, error);
  }
}

//** addOrderItemToCart(customer_id, product_id, quantity, price) - add an order item to the customer's cart
async function addOrderItemToCart(customer_id, flavor_id, quantity, price) {
  try {
    const order = await getCartByCustomer(customer_id);
    const newItem = await addToCart(order.id, flavor_id, quantity, price);
    return newItem;
  } catch (error) {
    console.error(
      `Error adding item to cart for customer ${customer_id}!`,
      error
    );
    throw error;
  }
}

// duplicateItems

async function duplicateItems(customer_id, flavor_id, order_id) {
  try {
    const { rows: dupItem } = await client.query(
      `SELECT * FROM order_items 
      WHERE customer_id = ${customer_id} AND flavor_id = ${flavor_id} AND order_id = ${order_id}
      RETURNING *;
      `
    );
    return dupItem;
  } catch (error) {
    console.error(`Error adding multiple of the same item`);
  }
}

//removeFromCart(id, user_id)
async function removeFromCart(id, customer_id) {
  try {
    const { rows: updatedCart } = await client.query(
      `DELETE FROM order_items
      WHERE id = $1
      AND customer_id =$2
      RETURNING *;
      `,
      [id, customer_id]
    );
    return updatedCart;
  } catch (error) {
    console.error(`Error deleting item with id ${id}!`, error);
  }
}

module.exports = {
  addToCart,
  duplicateItems,
  updateQuantity,
  getItemById,
  getActiveCartItems,
  addOrderItemToCart,
  getItemsByOrderId,
  removeFromCart,
};
