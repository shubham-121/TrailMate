import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ToastAndroid,
  Image,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setNearByPlacesCoords } from "../../redux/slices/nearByPlacesSlice";
import MapComponent from "./MapComponent";
import { activateCreateTripModal } from "../../redux/slices/createTripSlice";
import { TripDrawer } from "../trips/createTrip/TripDrawer";

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

      {/* {isCreatingTrip && <CreateTripModal isCreatingTrip={isCreatingTrip} />} */}
      {isCreatingTrip && <TripDrawer isCreatingTrip={isCreatingTrip} />}

      {/* show a create a trip button  */}

      {!isCreatingTrip && (
        <View className="absolute right-1 bottom-7 rounded-full ">
          <Pressable onPress={() => dispatch(activateCreateTripModal())}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 50 }}
              resizeMode="contain"
              source={{
                uri: "https://e7.pngegg.com/pngimages/851/507/png-clipart-computer-icons-button-create-logo-aqua-thumbnail.png",
              }}
            />
          </Pressable>
        </View>
      )}
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
