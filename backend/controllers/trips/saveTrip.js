const Trips = require("../../models/TripSchema/TripSchema");

async function saveTrip(req, res) {
  const { tripData, tripDetails } = req.body;

  if (!tripData || !tripDetails) {
    return res
      .status(400)
      .json({ message: "Incmplete data , please send full data" });
  }

  console.log("save trip body: ", tripData, tripDetails);

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
      lat: destination.fullLocationData.lat || null,
      lng: destination.fullLocationData.lng || null,
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
      userId: "shubham1234",
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
      console.log("Error in creating the trip in DB: ", tripObj);
      return;
    }

    console.log("Trip saved in the DB successfully: ", tripObj);
  } catch (error) {
    console.log("Error in creating the trip in DB: ", error.message);
    return;
  }

  return res.status(200).json({ message: "Save trip route" });
}

module.exports = saveTrip;
