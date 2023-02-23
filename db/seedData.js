// test
// Sunny's test
async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    // drop all tables, in the correct order
    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS order;
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
      username VARCHAR(225) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),

    );

    CREATE TABLE flavors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price , 
      description TEXT NOT NULL
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "creatorId" INTEGER REFERENCES users(id),
      "isPublic" BOOLEAN DEFAULT false, 
      name VARCHAR(255) UNIQUE NOT NULL,
      goal TEXT NOT NULL
    );

    CREATE TABLE routine_activities (
      id SERIAL PRIMARY KEY,
      "routineId" INTEGER REFERENCES routines(id),
      "activityId" INTEGER REFERENCES activities(id),
      duration INTEGER,
      count INTEGER,
      UNIQUE ("routineId", "activityId")
    );`);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}
