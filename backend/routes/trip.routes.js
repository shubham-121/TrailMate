const express = require("express");

const getUserTrips = require("../controllers/home/getUserTrips");
const getTripByID = require("../controllers/home/tripById");
const saveTrip = require("../controllers/trips/saveTrip");
const Trips = require("../models/TripSchema/TripSchema");

const verifyJWT = require("../controllers/auth/verifyJWT");

const router = express.Router();
router.use(verifyJWT);

router.get("/", getUserTrips); //get all user existing trips if exist in DB
router.get("/:id", getTripByID);
router.get("/saveTrip", saveTrip);

module.exports = router;

//routes here will be of : / , /:id , /trips etc
