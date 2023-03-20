//TAHJ//
import { API_URL } from "./url";
//func to make header
export function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("myToken");
  console.log("CURRENT TOKEN IN GET HEADERS:, ", currentToken);

  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
}
// Get OrderById //3.13.23
export async function getOrderById(id) {
  try {
    const response = await fetch(`${API_URL}orders/${id}`, {
      headers: getHeaders(),
    });
    const order = await response.json();
    return order;
  } catch (error) {
    console.log(error);
  }
}

// Get all orders

export async function getAllOrders() {
  try {
    const response = await fetch(`${API_URL}orders`, {
      headers: getHeaders(),
    });
    const allOrders = await response.json();
    return allOrders;
  } catch (error) {
    console.log(error);
  }
}

//post orders
export async function createOrder(
  customer_id,
  date,
  billing_address,
  shipping_address,
  total,
  payment_type
) {
  const sendData = {
    customer_id: customer_id,
    date: date,
    billing_address: billing_address,
    shipping_address: shipping_address,
    total: total,
    payment_type: payment_type,
  };
  try {
    const res = await fetch(`${API_URL}orders`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });

    const data = await res.json();
    // console.log("CREATE ORDER RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

//update orders
//?? What else do i need to update in the order besides if its fulfilled or not ??
export async function fulfillOrder(id, fulfilled) {
  if (!id) {
    throw new Error("Invalid order ID");
  }

  const sendData = {
    fulfilled: fulfilled,
  };
  try {
    const res = await fetch(`${API_URL}orders/${id}/fulfill`, {
      method: "PATCH",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });
    console.log("url", `${API_URL}orders/${id}/fulfill`);
    const data = await res.json();
    // console.log("EDIT ORDER RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}
