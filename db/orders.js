const client = require("./client");

//** getAllOrders()- return array of all orders
async function getAllOrders() {
    try {
        const { rows: allOrders } = await client.query(
            `SELECT * FROM orders;`
        );
        return allOrders

    } catch (error) {
        console.error("Error getting all orders!", error)

    }
}

//createOrder({customer_id, date, billing_address, shipping_address, subtotal, total, payment_type})
async function createOrder({ customer_id, date, billing_address, shipping_address, total, payment_type }) {

    try {
        const { rows: [newOrder] } = await client.query(
            `INSERT INTO orders(customer_id, date, billing_address, shipping_address, total, payment_type)
       VALUES ($1, $2, $3, $4, $5, $6 )
       RETURNING *;`,
            [customer_id, date, billing_address, shipping_address, total, payment_type]
        );
        return newOrder;

    } catch (error) {
        console.error(`Error creating order!`);
        throw error;
    }
}

//getOrdersByCustomer(customer_id)
async function getOrdersByCustomer(customer_id) {
    try {
        const { rows: orders } = await client.query(
            `SELECT *
         FROM orders
         WHERE customer_id = $1;
        `,
            [customer_id]
        );
        return orders;
    } catch (error) {
        console.error(`Error retrieving orders with id ${customer_id}!`, error);
    }
}

//getOrderById(order_id)
async function getOrderById(id) {
    try {
        const { rows: [order] } = await client.query(
            `SELECT *
         FROM orders
         WHERE id = $1;
        `,
            [id]
        );
        return order;
    } catch (error) {
        console.error(`Error retrieving order with id ${id}!`, error);
    }
}


//submitOrder(order_id)- changed 'fulfilled' status on specific order to true
async function submitOrder(id) {
    try {
        const { rows: [orderUpdate] } = await client.query(
            `UPDATE orders
       SET fullfilled = true
       WHERE id = $1
       RETURNING *;
      `,
            [id]
        );
        return orderUpdate;
    } catch (error) {
        console.error(`Error submitting order ${id}!`, error);
    }
}

//deleteOrder(user_id, order_id)- determine if user is creator of that id, 
//if they are the author, delete the order and all associated cart_items from the db

// async function deleteOrder(id, customer_id) {
//     try {
//         const { rows: deletedOrder } = await client.query(
//             `DELETE FROM order_items
//          WHERE id = $1
// AND customer_id =$2
//          RETURNING *;
//         `,
//             [id, customer_id]
//         );
//         return updatedCart;
//     } catch (error) {
//         console.error(`Error deleting item with id ${id}!`, error);
//     }
// }

module.exports = {
    createOrder,
    submitOrder,
    getAllOrders,
    getOrderById,
    getOrdersByCustomer
}
