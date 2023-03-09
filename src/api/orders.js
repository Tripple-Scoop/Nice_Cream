//TAHJ//
import { API_URL } from "./url";
//func to make header
export function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("auth_token");
  console.log("CURRENT TOKEN IN GET HEADERS:, ", currentToken);

  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
}
// Get all orders
export async function getAllOrders() {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: getHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
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
    const res = await fetch(`${BASE_URL}/orders`, {
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
export async function editOrder(orderId, fulfilled) {
  console.log(id);
  const sendData = {
    orderId: orderId,
    fulfilled: fulfilled,
  };
  try {
    const res = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(sendData),
      headers: getHeaders(),
    });

    const data = await res.json();
    // console.log("EDIT ORDER RETURNING: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}
