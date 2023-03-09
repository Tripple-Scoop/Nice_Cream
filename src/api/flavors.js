import { API_URL } from "./url";

export const fetchAllFlavors = async () => {
  try {
    const res = await fetch(`${API_URL}flavors`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const flavorData = await res.json();
    return flavorData

    // console.log(flavorData)
  } catch (e) {
    console.error(e)
  }
};



export const fetchCreateFlavor = async (name, type, image_url, description) => {
  try {
    const response = await fetch(`${API_URL}flavors/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        type: type,
        image_url: image_url,
        description: description
      })
    });
    const newFlavorData = await response.json();
    return newFlavorData;
  } catch (e) {
    console.error(e)
  }
};

export const fetchUpdateFlavor = async (name, type, image_url, description) => {
  try {
    const response = await fetch(`${API_URL}flavors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        type: type,
        image_url: image_url,
        description: description
      })
    });
    const newUpdatedFlavorData = await response.json();
    return newUpdatedFlavorData;
  } catch (e) {
    console.error(e)
  }
};


export const fetchDeleteFlavor = async () => {
  try {
    const response = await fetch(`${API_URL}flavors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const deletedFlavor = await response.json();
    return deletedFlavor;
  } catch (e) {
    console.error(e)
  }
};



// FAVORITES