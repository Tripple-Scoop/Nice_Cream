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
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS reviews;
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
      name VARCHAR(255) UNIQUE,
      type VARCHAR(255) ,
      image_url VARCHAR(225),
      description TEXT ,
      price INTEGER  
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES users(id),
      date VARCHAR(255) NOT NULL,
      billing_address VARCHAR(255) NOT NULL,
      shipping_address VARCHAR(255) NOT NULL,
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

    CREATE TABLE order_items (
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

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {
        name: 'Admin Adminson',
        username: 'admin',
        password: 'admin',
        address: '123 Admington Rd.',
        admin: true
      },
      {
        name: 'Robert de Leche',
        username: 'bobthesnob',
        password: 'iambob',
        address: '123 Main St.',
      },
      {
        name: 'Samantha Sucre',
        username: 'samiam',
        password: 'iscream',
        address: '321 Boulevard Rd.',
      },
      {
        name: 'Edwin Milk',
        username: 'milk_man',
        password: 'gotmilk',
        address: '321 Example Ct.',
      },
      {
        name: 'Alex Sweet',
        username: 'scoops123',
        password: 'basicpassword',
        address: '1 Lonely Rd.',
      },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users Created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
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

    console.log('Flavors Created:');
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
      flavor_id: 1,
      author_id: 2,
      title: "Mediocre at Best...",
      content: "Meh.",
    },
    {
      flavor_id: 2,
      author_id: 2,
      title: "Vanilla is okay",
      content: "I can not see the vanilla bean! What gross factory did this come from? I need answers",
    },
    {
      flavor_id: 4,
      author_id: 3,
      title: "Suprising Strawberry",
      content: "Was not expecting this to be as tasty as it was!",
    },
    {
      flavor_id: 2,
      author_id: 4,
      title: "Vanilla is tasty",
      content: "One of the most creamy vanilla ice creams I have eaten!",
    },
    {
      flavor_id: 1,
      author_id: 5,
      title: "So much flavor!",
      content: "Officially my favorite! Love that they have a dairy-free option!",
    }
  ]
  const reviews = await Promise.all(
    reviewsToCreate.map((review) => createReview(review))
  )
  console.log("Review Created: ", reviews)
  console.log("Finished creating reviews!")
}

async function createInitialOrders() {
  console.log("starting to create orders...")

  const ordersToCreate = [
    {
      customer_id: 2,
      date: '2020-11-11 11:11:00',
      billing_address: '123 Main St.',
      shipping_address: '123 Main St.',
      total: 40,
      payment_type: 'Credit',
      fulfilled: true
    },
    {
      customer_id: 3,
      date: '2021-01-01 12:00:00',
      billing_address: '321 Boulevard Rd.',
      shipping_address: '321 Boulevard Rd.',
      total: 25,
      payment_type: 'Debit',
      fulfilled: true
    },
    {
      customer_id: 4,
      date: '2022-05-05 07:00:00',
      billing_address: '321 Example Ct.',
      shipping_address: '321 Example Ct.',
      total: 200,
      payment_type: 'Klarna',
      fulfilled: true
    },
    {
      customer_id: 5,
      date: '2024-02-14 12:00:00',
      billing_address: '1 Lonely Rd.',
      shipping_address: '1 Lonely Rd.',
      total: 12,
      payment_type: 'Klarna',
      fulfilled: false
    },
  ]
  const orders = await Promise.all(
    ordersToCreate.map((order) => createOrder(order))
  )
  console.log("Orders Created: ", orders)
  console.log("Finished creating orders!")
}


async function createInitialOrderItems() {
  console.log('Starting to create order...');
  try {
    const itemsToCreate = [
      {
        customer_id: 2,
        flavor_id: 2,
        order_id: 1,
        quantity: 2
      },
      {
        customer_id: 3,
        flavor_id: 2,
        order_id: 2,
        quantity: 5
      },
      {
        customer_id: 4,
        flavor_id: 3,
        order_id: 3,
        quantity: 3
      },
      {
        customer_id: 5,
        flavor_id: 1,
        order_id: 4,
        quantity: 6
      }
    ]
    const items = await Promise.all(itemsToCreate.map(addToCart));
    console.log('Items Created:');
    console.log(items);
    console.log('Finished creating order items!');
  } catch (error) {
    console.error('Error creating items!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialFlavors()
    await createInitialReviews()
    await createInitialOrders()
    await createInitialOrderItems()
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
