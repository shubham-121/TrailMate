const mongoose = require("mongoose");

require("dotenv").config();

async function connectToDB() {
  const connectionString = process.env.DB_CONNECTION_STRING;

  try {
    const conn = await mongoose.connect(connectionString);

    if (!conn) {
      console.log("Error in connecting to the DB");
      return;
    }

    console.log("Successfully connected to the DB");
  } catch (err) {
    console.error("Error in connecting to the DB: ", err.message);
    throw new Error("Error in connecting to the DB");
  }
}

module.exports = connectToDB;
