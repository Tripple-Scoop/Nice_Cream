const client = require("./client");
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;


//getAllUsers()-return array of all registered users
async function getAllUsers(){
  try {
    const { rows: [users] } = await client.query(`
      SELECT * FROM users;
      `);
    return users;
  }catch(error){
    throw error;
  }
}

async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username;
      `, [username, hashedPassword]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;
      `, [userId]);

    if (!user) return null;

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username = $1; 
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

//updateUser-updates user password and address ONLY (use ... fields object)

async function updateUser({ id, ...fields }) {
  // do update the name, password, or address
  // return the updated activity
// build the set string
const setString = Object.keys(fields).map(
  (key, index) => `"${key}"=$${index + 1}`
).join(', ');

// return early if this is called without fields
if (setString.length === 0) {
  return;
}

  const { rows: [user] } = await client.query(`
    UPDATE users
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields));

  return user;

}



module.exports = {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser
}