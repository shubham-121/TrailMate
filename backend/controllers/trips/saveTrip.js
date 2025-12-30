const Trips = require("../../models/TripSchema/TripSchema");

async function saveTrip(req, res) {
  const { tripData, tripDetails } = req.body;

  const { _id: userId, email: userEmail } = req.user;
  // console.log("User body: ", user);

  if (!tripData || !tripDetails) {
    return res.status(404).json({
      message: "Incomplete data , please send full data",
      statusMsg: "Missing Data",
    });
  }

  console.log("save trip body: ", tripData, tripDetails);

  // console.log("coords:", tripData?.[0]?.fullLocationData?.destinationCoords);

  const mappedDestinations = tripData.map((destination) => ({
    destinationId: String(destination.id),

    displayName: destination.displayName,

    destinationDetails: {
      city: destination.fullLocationData.city,
      country: destination.fullLocationData.country,
      district: destination.fullLocationData.district,
      formattedAddress: destination.fullLocationData.formattedAddress,
      isoCountryCode: destination.fullLocationData.isoCountryCode,
      name: destination.fullLocationData.name,
      postalCode: destination.fullLocationData.postalCode,
      region: destination.fullLocationData.region,
      street: destination.fullLocationData.street,
      streetNumber: destination.fullLocationData.streetNumber,
      subregion: destination.fullLocationData.subregion,
      timezone: destination.fullLocationData.timezone,
      destinationCoords: {
        lat: destination.fullLocationData.destinationCoords.latitude,
        lng: destination.fullLocationData.destinationCoords.longitude,
      },
    },

    //user enetered destination metadata for each destination like notes, dates
    // userData: {
    //   notes: "",

    //   visitDates: {
    //     from: destination.startDate,
    //     to: destination.endDate,
    //   },

    //   numberOfDays: destination.numberOfDays,
    //   assignedDays: null,
    // },
  }));

  try {
    const tripObj = await Trips.create({
      userId: userId,
      tripTitle: tripDetails.tripTitle,
      tripStartDate: tripDetails.fromDate,
      tripEndDate: tripDetails.toDate,
      tripNumberOfDays: tripDetails.numberOfDays,
      tripDescription: tripDetails.description,
      tripCategory: tripDetails.category,
      //   tripThumbnail:,   add it later on

      tripDestinations: mappedDestinations,
    });

    if (!tripObj) {
      console.log("Cannn=ot create the trip in DB: ", tripObj);
      return res.status(400).json({
        message: "Error in saving the trip to the DB",
        statusMsg: "Trip Saving Error",
      });
    }

    console.log("Trip saved in the DB successfully: ", tripObj);

    return res
      .status(200)
      .json({ message: "Trip saved successfully", statusMsg: "Trip Saved" });
  } catch (error) {
    console.log("Error in creating the trip in DB: ", error.message);
    return res.status(500).json({
      message: "Server error while saving the trip",
      statusMsg: error.message,
    });
  }
}

module.exports = saveTrip;
