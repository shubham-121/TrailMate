import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";

export default function MapComponent({ location }) {
  //   const { latitude, longitude } = location;

  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    console.log("updated user location is: ", location);
    console.log("marker updated on map: ", markerPosition);
  }, [location, markerPosition]);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(e) => {
          const coords = e.nativeEvent.coordinate;
          setMarkerPosition(coords);
          console.log("Pressed", coords);
        }}
      >
        {markerPosition && (
          <Marker
            draggable
            tappable
            coordinate={{
              latitude: markerPosition.latitude,
              longitude: markerPosition.longitude,
            }}
            title="My Marker"
            description="This is the clicked location bby you"
          >
            <Callout tooltip>
              <View style={styles.calloutWrapper}>
                <View style={styles.calloutCard}>
                  <Text style={styles.calloutTitle}>Marker Details</Text>
                  <Text>Latitude: {markerPosition.latitude}</Text>
                  <Text>Longitude: {markerPosition.longitude}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
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
  calloutWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  calloutCard: {
    width: 250, // << FORCE BIG SIZE
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,

    // shadows that help visibility
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});
