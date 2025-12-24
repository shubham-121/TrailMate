function mapTripDestinations(tripData) {
  return tripData.map((destination) => ({
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
}

module.exports = mapTripDestinations;
