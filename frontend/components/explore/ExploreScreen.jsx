import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { fetchLocation } from "../../utils/commonFunctions/fetchLocation";
import { useIsFocused } from "@react-navigation/native";
import MapComponent from "./MapComponent";
// import MapComponent from "./MapComponent";
// import MapView from "react-native-maps";

export default function ExploreScreen() {
  const [location, setLocation] = useState({
    latitude: 30.3526212,
    longitude: 78.0193203,
    source: "default",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const userLocation = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          source: "device", //using accurate device location
        });

        console.log("fetched location using device: ", userLocation);
      } else {
        try {
          let res = await fetch("https://ipapi.co/json/");
          let data = await res.json();
          setLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            source: "ip", //using network based location
          });
        } catch (error) {
          setErrorMsg(
            "Permission to access location was denied",
            error.message
          );
        }
      }
    }
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg && ToastAndroid.show(errorMsg, ToastAndroid.LONG)}
      <Text>hello</Text>

      <MapComponent location={location}></MapComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    borderWidth: 2,
    height: "100%",
    width: "100%",
  },
});
