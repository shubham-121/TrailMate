import * as Location from "expo-location";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { MapRefContext } from "../../app/_layout";
import {
  setNearByPlacesCoords,
  setShowOnMapCoords,
} from "../../redux/slices/nearByPlacesSlice";
import SearchBar from "./SearchBar";
import { createTrip } from "../../redux/slices/createTripSlice";

export default function MapComponent({ location }) {
  //   const { latitude, longitude } = location;

  const [markerPosition, setMarkerPosition] = useState(null); //marker for user click on map
  const [isPopupVisible, setIsPopupVisible] = useState(false); //popup for location details of place clicked by user where marker is placed
  const [markerData, setMarkerData] = useState(null); //holds the marker data after reverse geocoding
  const [tripData, setTripData] = useState(null); //for createTripSlice data in redux

  //animating the map stuff here
  // const mapRef = useRef(null); //for moving map animation when user seraches a location
  const { latitude, longitude } = useSelector((store) => store.searchBar);

  const { showOnMapCoords } = useSelector((store) => store.nearByPlaces);

  const dispatch = useDispatch();

  const { mapRef } = useContext(MapRefContext);

  //1-  useeffect for search bar animation on user search
  useEffect(() => {
    // console.log("Animating the map");

    if (latitude && longitude && mapRef.current) {
      setMarkerPosition(null);
      setMarkerData(null);
      setIsPopupVisible(false);

      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        },
        5000
      );

      setMarkerPosition({ latitude, longitude });

      setIsPopupVisible(true);

      reverseGeocodeLocation({ latitude, longitude });

      //update the explore nearby coords
      dispatch(setNearByPlacesCoords({ latitude, longitude }));
    }
  }, [latitude, longitude]);

  //2- show on map useffect from the PlaceDetailsScreen
  useEffect(() => {
    if (!showOnMapCoords || !mapRef.current) return;

    if (showOnMapCoords && mapRef.current) {
      const lat = showOnMapCoords.lat;
      const lon = showOnMapCoords.lon;

      console.log("showOnMapcoords useefect ran : ", lat, lon);

      setMarkerPosition(null);
      setMarkerData(null);
      setIsPopupVisible(false);

      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        5000
      );
      setMarkerPosition({ latitude: lat, longitude: lon });

      setIsPopupVisible(true);

      reverseGeocodeLocation({ latitude: lat, longitude: lon });

      setTimeout(() => {
        dispatch(setShowOnMapCoords(null));
      }, 1000);
    }
  }, [showOnMapCoords]);

  //random useefect delete later
  useEffect(() => {
    //delete later
    console.log("updated user location is: ", location);
    console.log("marker updated on map: ", markerPosition);
  }, [location, markerPosition]);

  async function reverseGeocodeLocation(coords) {
    try {
      const data = await Location.reverseGeocodeAsync(coords);
      console.log("reverse geocoded data: ", data);
      setMarkerData(data[0].formattedAddress);
      setTripData(data[0]); //for sending data to redux
    } catch (error) {
      console.error("Error in reverse geocoding", error.message);
    }
  }

  return (
    <>
      <SearchBar />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        ref={mapRef}
        onPress={(e) => {
          const coords = e.nativeEvent.coordinate;
          setMarkerPosition(coords);
          setIsPopupVisible(true);
          reverseGeocodeLocation(coords);
          console.log("Pressed", coords);

          //set coords globally
          dispatch(
            setNearByPlacesCoords({
              latitude: coords.latitude,
              longitude: coords.longitude,
            })
          );
        }}
      >
        {/* current location marker */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          pinColor="skyblue"
          onPress={() => {
            setMarkerPosition({
              latitude: location.latitude,
              longitude: location.longitude,
            });
            setIsPopupVisible(true);
            reverseGeocodeLocation({
              latitude: location.latitude,
              longitude: location.longitude,
            });
          }}
        />

        {markerPosition && isPopupVisible && (
          <Marker
            coordinate={markerPosition}
            title="My Marker"
            draggable
            tappable
            description="This marker is clicked by you"
          ></Marker>
        )}
      </MapView>

      {isPopupVisible && markerPosition && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Selected Point</Text>

          <View className=" flex-row justify-between m-2">
            <Text style={styles.popupText}>
              Latitude: {markerPosition.latitude.toFixed(5)}
            </Text>
            <Text style={styles.popupText}>
              Longitude: {markerPosition.longitude.toFixed(5)}
            </Text>
          </View>
          <Text style={styles.popupText}>{markerData ? markerData : " "}</Text>

          <View className=" flex-row justify-around">
            <Text
              style={styles.closeButton}
              onPress={() => setIsPopupVisible(false)}
            >
              Dismiss
            </Text>

            <Text
              style={styles.closeButton}
              onPress={() => dispatch(createTrip(tripData))}
              //trigger dispatch action here with api data
            >
              Add To Trip
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    borderWidth: 2,
    height: "100%",
    width: "100%",
  },
  popup: {
    position: "absolute",
    bottom: 30, // Positioned 30 units from the bottom of the container
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    zIndex: 10, // Ensure it is rendered above the map

    // Shadow for better visual separation
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  popupTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  popupText: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    color: "#007AFF", // Standard iOS blue or another accent color
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
});
