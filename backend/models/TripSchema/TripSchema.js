const mongoose = require("mongoose");
const DestinationSchema = require("./DestinationSchema");

const tripSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    tripName: {
      type: String,
      required: true,
    },
    destinations: [DestinationSchema], //refrences to the Destination schema,

    //other metadata related to the Trip
    title: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },
    numberOfDays: {
      type: Number,
    },
    description: {
      type: String,
    },
    thumbnail: {
      //image cover
      type: String,
    },
    category: {
      type: String,
      enum: ["Leisure", "Adventure", "Solo", "Family", "SightSeeing", "Other"],
    },
  },
  { timestamps: true }
);

const Trips = mongoose.model("Trip", tripSchema);

module.exports = Trips;
