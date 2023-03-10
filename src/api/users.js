
//import API_URL
import { API_URL } from "./url";

export const login = async (username, password) => {
  const result = await fetch(`${API_URL}users/login`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
  const json = await result.json();
  // console.log('json from src > api', json)

  if (json.error) {
    throw json.error
  }

  localStorage.setItem('userToken', json.token)
  // console.log(json);

  return json;
}

//export function loginUser that logs user into fitness trackr and returns a token

export const register = async ({name, username, password, address}) => {
  console.log(name, username, password, address);
  const result = await fetch(`${API_URL}users/register`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        address: address,
        admin: false
      })
    })
  const json = await result.json();

  // json.success === true ? document.getElementById('loginPopUpDiv').innerHTML = json.message : document.getElementById('loginPopUpDiv').innerHTML = json.message;

  if (json.error) {
    throw json.error
  }

  localStorage.setItem('userToken', json.token)
  console.log(json);
  return json;


}


export const fetchUser = async () => {

  const result = await fetch(`${API_URL}users/me`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  const json = await result.json();

  if (json.error) {
    throw json.error
  }
  // console.log(json);
  return json;

}

// export const fetchUserOrders = async () {

// }

export const fetchUserReviews = async (userId) => {
  try {
    const allReviews = await fetch(`${API_URL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      })
    },
    );
    const json = await response.json();

    if (json.success === false) {
      throw json.error.message;
    }
    console.log('allReviews:', allReviews);
    const userReviews = allReviews.filter(review => review.customer_id === userId);
    console.log('userReviews', userReviews);
    return userReviews;
  } catch (error) {
    console.error(error);
  }
}
