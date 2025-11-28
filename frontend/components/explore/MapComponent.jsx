import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function MapComponent({ location }) {
  //   const { latitude, longitude } = location;

  const [markerPosition, setMarkerPosition] = useState(null); //marker for user click on map
  const [isPopupVisible, setIsPopupVisible] = useState(false); //popup for location details of place clicked by user where marker is placed
  const [markerData, setMarkerData] = useState(null); //holds the marker data after reverse geocoding

  //animating the map stuff here
  const mapRef = useRef(null); //for moving map animation when user seraches a location
  const { latitude, longitude, formattedString } = useSelector(
    (store) => store.searchBar
  );

  useEffect(() => {
    console.log("Animating the map");

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
    }
  }, [latitude, longitude]);

  useEffect(() => {
    console.log("updated user location is: ", location);
    console.log("marker updated on map: ", markerPosition);
  }, [location, markerPosition]);

  function handleClosePopup() {}

  async function reverseGeocodeLocation(coords) {
    try {
      const data = await Location.reverseGeocodeAsync(coords);
      console.log("reverse geocoded data: ", data);
      setMarkerData(data[0].formattedAddress);
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

          <Text
            style={styles.closeButton}
            onPress={() => setIsPopupVisible(false)}
          >
            Dismiss
          </Text>
        </View>
      )}
    </>
  );
}

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
