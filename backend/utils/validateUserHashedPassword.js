const bcrypt = require("bcrypt");

const saltRounds = 10;

async function validateUserHashedPassword(userPassword, hashedPassword) {
  try {
    const isMatched = await bcrypt.compare(userPassword, hashedPassword);

    console.log("ismatched:", isMatched);

    if (isMatched) {
      console.log("pswd matched of user: ", isMatched);
      return isMatched;
    }

    return false;
  } catch (error) {
    throw new Error(
      "Error in matching   the hashed user password:",
      error.message
    );
  }
}

module.exports = validateUserHashedPassword;
