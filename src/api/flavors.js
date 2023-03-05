import { API_URL } from "./url";

export const fetchAllFlavors = async () => {
  const response = await fetch(`${API_URL}/flavors/allFlavors`, {
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