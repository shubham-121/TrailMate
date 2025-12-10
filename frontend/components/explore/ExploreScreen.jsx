import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setNearByPlacesCoords } from "../../redux/slices/nearByPlacesSlice";
import MapComponent from "./MapComponent";
import { deActivateCreateTripModal } from "../../redux/slices/createTripSlice";
// import MapComponent from "./MapComponent";
// import MapView from "react-native-maps";

export default function ExploreScreen() {
  const [location, setLocation] = useState({
    latitude: 30.352642,
    longitude: 78.019554,
    source: "default",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const { isCreatingTrip } = useSelector((store) => store.createTrip);

  //fetch the nearby places on mount before map loads or user clicks on map (default nearby places)
  useEffect(() => {
    dispatch(
      setNearByPlacesCoords({
        latitude: location.latitude,
        longitude: location.longitude,
      })
    );
  }, [location]);

  console.log("default initial coords:", location);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        try {
          const userLocation = await Location.getCurrentPositionAsync();

          setLocation({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            source: "device", //using accurate device location
          });

          console.log("fetched location using device: ", userLocation);

          //set the coords globally here also for nearby places component to work

          // dispatch(
          //   setNearByPlacesCoords({
          //     latitude: coords.latitude,
          //     longitude: coords.longitude,
          //   })
          // );
        } catch (error) {
          console.log("GPS error, location unavailable", error.message);

          // fallback if user doesnt allow permission, then get newthwork based location
          try {
            let res = await fetch("https://ipapi.co/json/");
            let data = await res.json();
            setLocation({
              latitude: data.latitude,
              longitude: data.longitude,
              source: "ip", //using network based location
            });
            console.log("Network based location: ", data);

            //set the coords globally here also for nearby places component to work

            // dispatch(
            //   setNearByPlacesCoords({
            //     latitude: coords.latitude,
            //     longitude: coords.longitude,
            //   })
            // );
          } catch (error) {
            setErrorMsg(
              "Permission to access location was denied 1",
              error.message
            );
          }
        }
      } else {
        try {
          let res = await fetch("https://ipapi.co/json/");
          let data = await res.json();
          setLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            source: "ip", //using network based location
          });
          console.log("(else block) Network based location: ", data);

          //set the coords globally here also for nearby places component to work

          // dispatch(
          //   setNearByPlacesCoords({
          //     latitude: coords.latitude,
          //     longitude: coords.longitude,
          //   })
          // );
        } catch (error) {
          setErrorMsg(
            "Permission to access location was denied 2",
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

      {location ? (
        <MapComponent location={location}></MapComponent>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="skyblue "></ActivityIndicator>
        </View>
      )}

      {isCreatingTrip && <CreateTripModal isCreatingTrip={isCreatingTrip} />}
    </View>
  );
}

export function CreateTripModal({ isCreatingTrip }) {
  const dispatch = useDispatch();
  return (
    <View>
      <Modal animationType="slide" visible={isCreatingTrip}>
        <View style={{ flex: 1 }}>
          <Pressable
            style={{ position: "absolute", top: 30, right: 20, padding: 10 }}
            onPress={() => dispatch(deActivateCreateTripModal())}
          >
            <Text>Close</Text>
          </Pressable>

          <Text>Modal Content here!</Text>
        </View>
      </Modal>
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
