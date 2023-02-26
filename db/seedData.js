// test
// Sunny's test

const client = require("./client")

const {
  createUser,
  createFlavor,
  createReview,
  createOrder,
  addToCart,
 } = require("./")


async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    // drop all tables, in the correct order
    await client.query(`
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS flavors;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR (225) NOT NULL,
      username VARCHAR(225) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      admin BOOLEAN DEFAULT false
    );

    CREATE TABLE flavors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      type VARCHAR(255) NOT NULL,
      image_url VARCHAR(225),
      description TEXT NOT NULL,
      price INTEGER NOT NULL 
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES users(id),
      date VARCHAR(255) NOT NULL,
      billing_address VARCHAR(255) NOT NULL,
      shipping_address VARCHAR(255) NOT NULL,
      subtotal VARCHAR(255) NOT NULL,
      total INTEGER NOT NULL,
      payment_type VARCHAR(255) NOT NULL,
      fulfilled BOOLEAN DEFAULT false
    );

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      author_id INTEGER REFERENCES users(id),
      flavor_id INTEGER REFERENCES flavors(id),
      title VARCHAR(255) NOT NULL,
      content VARCHAR(255) NOT NULL,
      UNIQUE ("author_id", "flavor_id")
    );      

    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES users(id),
      flavor_id INTEGER REFERENCES flavors(id),
      order_id INTEGER REFERENCES orders(id),
      quantity INTEGER NOT NULL,
      UNIQUE ("customer_id", "flavor_id", "order_id")
    );`);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers(){
  console.log('Starting to create users...');
  try{
    const usersToCreate = [
    {name: 'Admin Adminson',
    username: 'admin', 
    password: 'admin',
    address: '123 Admington Rd.', 
    admin: true
    }, 
    {name: 'Robert de Leche',
    username: 'bobthesnob', 
    password: 'iambob',
    address: '123 Main St.', 
    }, 
    {name: 'Samantha Sucre',
    username: 'samiam', 
    password: 'iscream',
    address: '321 Boulevard Rd.', 
    }, 
    {name: 'Edwin Milk',
    username: 'milk_man', 
    password: 'gotmilk',
    address: '321 Example Ct.', 
    }, 
    {name: 'Alex Sweet',
    username: 'scoops123', 
    password: 'basicpassword',
    address: '1 Lonely Rd.', 
    }, 
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch(error){
    console.log.err('Error creating users!');
    throw error;
  }
}

async function createInitialFlavors() {
 
  try {
    console.log('Starting to create flavors...');

    const flavorsToCreate = [
      {
        name: 'Chocolate',
        type: 'Ice Cream',
        image_url: 'https://example.com/chocolate.jpg',
        description: 'Rich and creamy chocolate flavor.',
        price: 3,
      },
      {
        name: 'Vanilla',
        type: 'Ice Cream',
        image_url: 'https://example.com/vanilla.jpg',
        description: 'Smooth and classic vanilla flavor.',
        price: 3,
      },
      {
        name: 'Strawberry',
        type: 'Ice Cream',
        image_url: 'https://example.com/strawberry.jpg',
        description: 'Sweet and fruity strawberry flavor.',
        price: 4,
      },
      {
        name: 'Mint Chocolate Chip',
        type: 'Ice Cream',
        image_url: 'https://example.com/mint-chocolate-chip.jpg',
        description: 'Cool and refreshing mint flavor with chocolate chips.',
        price: 4,
      },
      {
        name: 'Caramel',
        type: 'Sauce',
        image_url: 'https://example.com/caramel.jpg',
        description: 'Sweet and gooey caramel sauce.',
        price: 2,
      },
      {
        name: 'Hot Fudge',
        type: 'Sauce',
        image_url: 'https://example.com/hot-fudge.jpg',
        description: 'Rich and decadent hot fudge sauce.',
        price: 2,
      },
    ];
    const flavors = await Promise.all(flavorsToCreate.map(createFlavor));

    console.log('Flavors created:');
    console.log(flavors);

    console.log('Finished creating flavors!');
  } catch (error) {
    console.error('Error creating flavors!');
    throw error;
  }
}

async function createInitialReviews() {
  console.log("starting to create reviews...")

  const reviewsToCreate = [
    {
      flavor_id:1,
      author_id: 2,
      title: "Chocolate rules",
      content: "Hands down the best chocolate ice cream ever!",
    },
    {
      flavor_id:2,
      author_id: 2,
      title: "Vanilla is okay",
      content: "Kind of plain but can't go wrong with the classics!",
    },
    {
      flavor_id: 4,
      author_id: 1,
      title: "Suprising Strawberry",
      content: "Was not expecting this to be as tasty as it was!",
    },
    {
      flavor_id: 2,
      author_id: 3,
      title: "Vanilla is tasty",
      content: "One of the most creamy vanilla ice creams I've eaten!",
    },
  ]
  const reviews = await Promise.all(
    reviewsToCreate.map((review) => createReview(review))
  )
  console.log("Review Created: ", reviews)
  console.log("Finished creating reviews.")
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialFlavors()
    await createInitialReviews()
    // await createInitialOrders()
    // await createInitialCartItems()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables
}

