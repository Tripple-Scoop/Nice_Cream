const client = require("./client");

//addToCart(customer_id, flavor_id, quantity)- returns cart item object
async function addToCart(customer_id, flavor_id, quantity) {

    try {
        const { rows: order_item } = await client.query(
            `INSERT INTO order_items(customer_id, flavor_id, quantity)
         VALUES ($1, $2, $3)
         RETURNING *;`
            [customer_id, flavor_id, quantity]
        );
        return order_item;

    } catch (error) {
        console.error(`Error adding item to cart!`);
        throw error;
    }
}

//updateQuantity(cart_item.id, newQuant)- allow to quantity of flavor
async function updateQuantity(id, newQuant) {
    try {
        const { rows: [newQuantity] } = await client.query(
            `UPDATE order_items
       SET quanity = $1
       WHERE id = $2
       RETURNING *;
      `,
            [newQuant, id]
        );
        return newQuantity;
    } catch (error) {
        console.error(`Error updating quantity ${id}!`, error);
    }
}

//getItemById(cart_item_id)- return cart_item based on it's id
async function getItemById(id) {
    try {
        const { rows: [item] } = await client.query(
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
        const { rows: order } = await client.query(
            `SELECT *
         FROM order_items
         WHERE order_id = $1;
        `,
            [order_id]
        );
        return order;
    } catch (error) {
        console.error(`Error retrieving order with id ${order_id}!`, error);
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

module.exports ={
    addToCart,
    updateQuantity,
    getItemById,
    getActiveCartItems,
    getItemsByOrderId,
    removeFromCart
}