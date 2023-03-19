import { API_URL } from "./url";

export const fetchAllFlavors = async () => {
  try {
    const res = await fetch(`${API_URL}flavors`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const flavorsData = await res.json();
    return flavorsData;

    // console.log(flavorsData)
  } catch (e) {
    console.error(e);
  }
};

export const fetchFlavorById = async (id) => {
  try {
    const res = await fetch(`${API_URL}flavors/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const flavorIdData = await res.json();
    console.log("FlavorIdData", flavorIdData);
    return flavorIdData;
  } catch (e) {
    console.error(e);
  }
};

export const fetchCreateFlavor = async (
  name,
  type,
  image_url,
  description,
  price
) => {
  try {
    const response = await fetch(`${API_URL}flavors/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
      body: JSON.stringify({
        name: name,
        type: type,
        image_url: image_url,
        description: description,
        price: price,
      }),
    });
    const newFlavorData = await response.json();
    return newFlavorData;
  } catch (e) {
    console.error(e);
  }
};

export const fetchUpdateFlavor = async (
  name,
  type,
  image_url,
  description,
  price,
  id
) => {
  try {
    const response = await fetch(`${API_URL}flavors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        type: type,
        image_url: image_url,
        description: description,
        price: price,
      }),
    });
    const newUpdatedFlavorData = await response.json();
    return newUpdatedFlavorData;
  } catch (e) {
    console.error(e);
  }
};

export const fetchDeleteFlavor = async (id) => {
  try {
    const response = await fetch(`${API_URL}flavors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
    });
    const deletedFlavor = await response.json();
    return deletedFlavor;
  } catch (e) {
    console.error(e);
  }
};

// FAVORITES
