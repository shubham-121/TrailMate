const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    //save id in redux to here
    destinationId: {
      required: true,
      type: String,
    },

    //destination name
    displayName: {
      type: String,
      required: true,
    },

    //   DestinationDetails for metadata
    destinationDetails: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      district: {
        type: String,
      },
      formattedAddress: {
        type: String,
      },
      isoCountryCode: {
        type: String,
      },
      name: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      region: {
        type: String,
      },
      street: {
        type: String,
      },
      streetNumber: {
        type: String,
      },
      subregion: {
        type: String,
      },
      timezone: {
        type: String,
      },
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },

    //user entered Data
    userData: {
      notes: {
        type: String,
      },
      visitDates: {
        from: {
          type: Date,
          // required: true,
        },
        to: {
          type: Date,
          // required: true,
        },
      },
      numberOfDays: {
        type: Number,
      },
      assignedDays: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = destinationSchema;
