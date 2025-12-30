const Trips = require("../../models/TripSchema/TripSchema");

async function getAllUserTrips(req, res) {
  return res.status(200).json({ message: "Get all user trips route called" });
}

module.exports = getAllUserTrips;
