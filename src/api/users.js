
//import API_URL
import { API_URL } from "./url";

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const json = await response.json();
  if (json.success === false) {
    throw json.error.message;
  }
  return json.data.token;
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
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

    alert("Login successful");
    setToken(json.data.token);
    history.push("/Home");
  } catch (e) {
    console.error(e);
    setError(e);
  }

  setUsername("");
  setPassword("");
}; 

export const fetchUser = async () => {

    const result = await fetch(`${API_URL}/users/me`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
    const json = await result.json();

    if(json.error){
      throw json.error
    }
    // console.log(json);
    return json;

}

// export const fetchUserOrders = async () {

// }

// export const fetchUserReviews = async => () {
//   try {
//     const response = await fetch(`${API_URL}/users/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username,
//           password,
//         },
//       })
//     },
//     );
//     const json = await response.json();
//     if (json.success === false) {
//       throw json.error.message;
//     }

//     alert("Fetched user reviews");
//     setToken(json.data.token);
//   } catch (error) {
//     console.error(error);
//   }
// }
