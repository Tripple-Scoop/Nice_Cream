// test
// Sunny's test
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
      type VARCHAR(255) UNIQUE NOT NULL,
      image_url VARCHAR(225),
      description TEXT NOT NULL,
      price INTEGER NOT NULL, 
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
      UNIQUE ("user_id", "flavor_id")
    );      

    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES users(id),
      flavor_id INTEGER REFERENCES flavors(id),
      quantity INTEGER NOT NULL,
      UNIQUE ("user_id", "flavor_id")
    );`);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}
