import { API_URL } from "./url";

export const addToCart = async (flavor_id, quantity, userId) => {
  try {
    // Check if user has an unfulfilled order
    const response = await fetch(`${API_URL}orders/customer/${userId}`);
    const orders = await response.json();
    let order_id;

    // If user has an unfulfilled order, use its id
    if (orders.length > 0) {
      order_id = orders[0].id;
    } else {
      // If user does not have an unfulfilled order, create a new one
      const orderResponse = await fetch(`${API_URL}orders/customer/:id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customer_id,
          fulfilled: false,
        }),
      });
      const orderData = await orderResponse.json();
      order_id = orderData.id;
    }

    // Create the order_item sending the orderId from the first step
    const orderItemResponse = await fetch(`${API_URL}order_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavor_id,
        quantity,
        order_id,
        userId,
      }),
    });
    const data = await orderItemResponse.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
// get all cart items
export const getAllCartItems = async () => {
  try {
    const response = await fetch(`${API_URL}order_items`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// get cart items by order id
export const getCartItemsByOrderId = async (order_id) => {
  try {
    const response = await fetch(`${API_URL}/order_items/${order_id}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// update quantity of cart item
export const updateCartItemQuantity = async (id, newQuantity) => {
  try {
    const response = await fetch(`${API_URL}/order_items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// remove item from cart
export const removeCartItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/order_items${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
