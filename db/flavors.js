
// getAllFlavors()
// -return array of all flavor objects 

async function getAllFlavors() {
  try{
    const {rows: flavors} = await client.query(
      `SELECT * FROM flavors;`
    );
    return flavors

  }catch (error){
    console.error("Error getting all flavors!", error)

  }
}

//*** createFlavor(name, type, image_url, description, price)
//-return new flavor obj

// getFlavorByName(name)
// - return flavor obj

// getFlavorById(id)
// - return flavor obj

//*** updateFlavor(id, ...fields)
//- return upd:ated flavor

//*** deleteFlavor(id)


// Comment here to test Flavor branch push 
