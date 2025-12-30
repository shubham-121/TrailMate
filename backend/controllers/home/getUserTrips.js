const Trips = require("../../models/TripSchema/TripSchema");

//fetches the save user trips and display in homescreen

async function getUserTrips(req, res) {
  const { _id: userId, email: userEmail } = req.user;

  if (!userId && !userEmail) {
    return res.status(400).json({ message: "User not allowed, login again!" });
  }

  try {
    const userTrips = await Trips.find({ userId });

    if (!userTrips) {
      console.log("User existing trips not found in DB ", userTrips);

      return res.status(400).json({
        message: "No exsiting trips found",
        userTrips: userTrips,
        success: false,
      });
    }

    console.log("User existing trips  found in DB : ", userTrips);

    return res.status(200).json({
      message: "Existing user trips found in home ui",
      userTrips: userTrips,
      success: true,
    });
  } catch (error) {
    console.log("Error in fetchign trips: ", error.message);

    return res.status(400).json({
      message: "Some error occured while fetching existing trips",
      success: true,
    });
  }
}

module.exports = getUserTrips;
