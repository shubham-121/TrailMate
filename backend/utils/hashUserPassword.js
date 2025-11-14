const bcrypt = require("bcrypt");

const saltRounds = 10;

const userPassword = "Bhatt@1111";

async function hashUserPassword(userPassword) {
  try {
    const hashed = bcrypt.hash(userPassword, saltRounds);
    console.log("User password hashed successfully: ", hashed);
    return hashed;
  } catch (error) {
    throw new Error("Error in hashing the user password:", error.message);
  }
}

// hashUserPassword(userPassword);

module.exports = hashUserPassword;
