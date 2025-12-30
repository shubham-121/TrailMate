const Trips = require("../../models/TripSchema/TripSchema");

async function getTripByID(req, res) {
  return res.status(200).json({ message: "Get trip by id route called" });
}

module.exports = getTripByID;
