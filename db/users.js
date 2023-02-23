const client = require("./client");
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
      const {rows:[user]} = await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      
    ON CONFLICT (username) DO NOTHING 
      RETURNING id, username;
      `,[username, hashedPassword]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUser({username, password}) {
    if (!username || !password) {
      return;
    }
  
    try {
      const user = await getUserByUsername(username);
      if(!user) return;
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if(!passwordsMatch) return;
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  async function getUserById(userId) {
    try {
      const {rows: [user]} = await client.query(`
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


  module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
  }