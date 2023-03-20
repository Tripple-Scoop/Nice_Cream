import { API_URL } from "./url";

export const addToCart = async ({ flavor_id, quantity, customer_id }) => {
  try {
    // Check if user has an unfulfilled order
    // console.log("LOG : USER ID", customer_id);
    const response = await fetch(`${API_URL}orders/customer/${customer_id}`);
    const orders = await response.json();
    let order_id;

    // If user has an unfulfilled order, use its id
    if (orders.length > 0) {
      order_id = orders[0].id;
    } else {
      // If user does not have an unfulfilled order, create a new one
      const orderResponse = await fetch(`${API_URL}orders`, {
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
    console.log("LOG", flavor_id, quantity, order_id, customer_id);

    // Create the order_item sending the orderId from the first step
    const orderItemResponse = await fetch(`${API_URL}order_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavor_id: flavor_id,
        quantity: quantity,
        order_id: order_id,
        customer_id: customer_id,
      }),
    });
    const data = await orderItemResponse.json();

    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
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

// get cart items by username
export const fetchActiveCart = async (username) => {
  const result = await fetch(`${API_URL}order_items/${username}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("myToken")}`,
    },
  });

  const json = await result.json();
  console.log(json);

  if (json.error) {
    throw json.error;
  }
  return json;
};

//

// update quantity of cart item
export const updateCartItemQuantity = async (id, newQuantity) => {
  try {
    const response = await fetch(`${API_URL}order_items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    const data = await response.json();
    console.log("Updating....", data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

// remove item from cart
export const rmvItem = async (falvor_id) => {
  try {
    const response = await fetch(`${API_URL}order_items/${falvor_id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
