import { ToastAndroid } from "react-native";
import * as Location from "expo-location";

export async function reverseGeocodeLocation(coords) {
  console.log("in reverseGeocode function, coords also: ", coords);

  if (!coords) return;

  try {
    const data = await Location.reverseGeocodeAsync(coords);
    console.log("reverse geocoded data from function call: ", data);

    if (!data || !data.length) return;

    return data;

    // setMarkerData?.(data[0].formattedAddress);
    // setTripData?.({ ...data[0], destinationCoords: coords }); //for sending data to redux
  } catch (error) {
    console.error("Error in reverse geocoding", error.message);
    ToastAndroid.BOTTOM(
      "Error in getting details, try again by reloading app",
      ToastAndroid.LONG
    );
    return;
  }
}
