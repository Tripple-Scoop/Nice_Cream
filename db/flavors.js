const client = require("./client")
// getAllFlavor()
// -return array of all flavor objects 

async function getAllFlavors() {
  try {
    const { rows: flavors } = await client.query(
      `SELECT * FROM flavors;`
    );
    return flavors

  } catch (error) {
    console.error("Error getting all flavors!", error)

  }
}

//*** createFlavor(name, type, image_url, description, price)
//-return new flavor obj

async function createFlavor(flavor) {

  try {
    const { rows: [flavors] } = await client.query(
      `INSERT INTO flavors(name, type, image_url, description, price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, type, image_url, description, price`,
      [flavor.name, flavor.type, flavor.image_url, flavor.description, flavor.price]
    );
    return flavors;

  } catch (error) {
    console.error(`Error creating flavor ${flavor.name}!`);
    throw error;
  }
}
// getFlavorByName(name)
// - return flavor obj
async function getFlavorByName(name) {
  try {
    const { rows: [flavor] } = await client.query(
      `SELECT *
       FROM flavors
       WHERE name = $1;
      `,
      [name]
    );
    return flavor;
  } catch (error) {
    console.error(`Error retrieving flavor ${name}!`, error);
  }
}


// getFlavorById(id)
// - return flavor obj

async function getFlavorById(id) {
  try {
    const { rows: [flavor] } = await client.query(
      `SELECT *
       FROM flavors
       WHERE id = $1;
      `,
      [id]
    );
    return flavor;
  } catch (error) {
    console.error(`Error retrieving flavor with id ${id}!`, error);
  }
}

//*** updateFlavor(id, ...fields)
//- return upd:ated flavor
async function updateFlavor({ id, ...fieldsToUpdate }, fieldsToReturn = ['*']) {
  try {
    const filteredFields = Object.keys(fieldsToUpdate).filter((key) => fieldsToUpdate[key] !== undefined);
    const setString = filteredFields
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    const { rows: [flavor] } = await client.query(
      `UPDATE flavors
     SET ${setString}
     WHERE id = ${id}
     RETURNING ${fieldsToReturn.join(', ')}
    `,
      filteredFields.map((key) => fieldsToUpdate[key])
    );
    return flavor;
  } catch (error) {
    console.error(`Error updating flavor with id ${id}!`, error);
  }
}

//*** deleteFlavor(id)
async function deleteFlavor(id) {
  try {
    const { rows: [flavor] } = await client.query(
      `DELETE FROM flavors
       WHERE id = $1
       RETURNING *;
      `,
      [id]
    );
    return flavor;
  } catch (error) {
    console.error(`Error deleting flavor with id ${id}!`, error);
  }
}

// Comment here to test Flavor branch push 

module.exports = {
  createFlavor,
  getAllFlavors,
  getFlavorById,
  getFlavorByName,
  updateFlavor,
  deleteFlavor
}