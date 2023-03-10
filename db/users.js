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

async function createUser({ name, username, password, address, admin = false }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(name, username, password, address, admin)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `, [name, username, hashedPassword, address, admin]);
    console.log("DEBUG:  after the insert statement: users:", user);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}


async function getUser({ username, password }) {
  if (!username || !password) {
    return 'You are missing the username or password.';
  }

  try {
    const user = await getUserByUsername(username);
    console.log("DEBUG:  Logging user: ", user);
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
  
  //delete user password
  delete user.password;

  return user;

}

async function addAdminPerms(userId){
  const {rows: [user]} = await client.query(`
  UPDATE users
  SET admin = true
  WHERE id=${userId}
  RETURNING *;
  `)

  delete user.password;
  return user;
}

async function removeAdminPerms(userId){
  try{
  const {rows: [user]} = await client.query(`
  UPDATE users
  SET admin = false
  WHERE id=${userId}
  RETURNING *;
  `)

  delete user.password;
  return user;
  }catch(error){
    throw error;
  }

}

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
  addAdminPerms,
  removeAdminPerms
}