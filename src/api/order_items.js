//TAHJ//
import { getHeaders } from "./orders";
import { API_URL } from "./url";
//Get All Cart Items
export async function getAllCartItems() {
  try {
    const response = await fetch(`${API_URL}order_items`, {
      headers: getHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
// GET ADD TO CART
export async function addItemToCart(customer_id, flavor_id, quantity) {
  const sendData = {
    customer_id: customer_id,
    flavor_id: flavor_id,
    quantity: quantity,
  };
  try {
    const res = await fetch(`${API_URL}order_items`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

// PATCH QUANTY
export async function updateQuantity(id, quantity) {
  const sendData = {
    quantity: quantity,
  };
  try {
    const res = await fetch(`${API_URL}order_items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });
  } catch (error) {
    throw error;
  }
}

// DELETE REMOVE ITEM
export async function removeCartItem(id) {
  try {
    const res = await fetch(`${API_URL}order_items/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    // console.log("REMOVE ITEM FROM CART RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}
