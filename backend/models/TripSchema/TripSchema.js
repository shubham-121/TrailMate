const mongoose = require("mongoose");
const DestinationSchema = require("./DestinationSchema");

const tripSchema = new mongoose.Schema(
  {
    // tripId: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: String,
      required: true,
    },
    tripTitle: {
      type: String,
      required: true,
    },

    tripDestinations: [DestinationSchema], //refrences to the Destination schema,

    //other metadata related to the Trip

    tripStartDate: {
      type: Date,
      required: true,
    },

    tripEndDate: {
      type: Date,
      required: true,
    },
    tripNumberOfDays: {
      type: Number,
    },
    tripDescription: {
      type: String,
    },
    tripThumbnail: {
      //image cover
      type: String,
    },
    tripCategory: {
      type: String,
      enum: ["Leisure", "Adventure", "Solo", "Family", "SightSeeing", "Other"],
    },
  },
  { timestamps: true }
);

const Trips = mongoose.model("Trip", tripSchema);

module.exports = Trips;
