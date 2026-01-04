import * as Location from "expo-location";
import { useContext, useEffect } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  setNearByPlacesCoords,
  setShowOnMapCoords,
} from "../../redux/slices/nearByPlacesSlice";
import SearchBar from "./SearchBar";

import { MapUIContext } from "../../utils/context/MapUIContext";
import { MapRefContext } from "../../utils/context/MapRefProvider";

import { TripModePopup } from "./popups/TripModePopup";
import { ExploreModePopup } from "./popups/ExploreModePopup";

export default function MapComponent({ location }) {
  //   const { latitude, longitude } = location;

  // const [markerPosition, setMarkerPosition] = useState(null); //marker for user click on map
  // const [isPopupVisible, setIsPopupVisible] = useState(false); //popup for location details of place clicked by user where marker is placed
  // const [markerData, setMarkerData] = useState(null); //holds the marker data after reverse geocoding
  // const [tripData, setTripData] = useState(null); //for createTripSlice data in redux

  const {
    markerPosition,
    setMarkerPosition,
    isPopupVisible,
    setIsPopupVisible,
    markerData,
    setMarkerData,
    tripData,
    setTripData,
  } = useContext(MapUIContext);

  //animating the map stuff here
  // const mapRef = useRef(null); //for moving map animation when user seraches a location
  const { latitude, longitude } = useSelector((store) => store.searchBar);

  const { showOnMapCoords } = useSelector((store) => store.nearByPlaces);

  const { isTripNavigationMode, currentDestinationData } = useSelector(
    (store) => store.tripNavigation
  );

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

  //useefect for tripNavigationMode
  useEffect(() => {
    if (!currentDestinationData || !mapRef.current || !isTripNavigationMode)
      return;

    const { destinationCoords } = currentDestinationData.destinationDetails;

    const region = {
      latitude: destinationCoords.lat,
      longitude: destinationCoords.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    //map animation for Next destination:

    mapRef.current.animateToRegion(region, 1200);

    setMarkerPosition({
      latitude: destinationCoords.lat,
      longitude: destinationCoords.lng,
    });

    setIsPopupVisible(true);
  }, [currentDestinationData, isTripNavigationMode]);

  async function reverseGeocodeLocation(coords) {
    console.log("coords also: ", coords);
    try {
      const data = await Location.reverseGeocodeAsync(coords);
      console.log("reverse geocoded data: ", data);
      setMarkerData(data[0].formattedAddress);

      setTripData({ ...data[0], destinationCoords: coords }); //for sending data to redux
    } catch (error) {
      console.error("Error in reverse geocoding", error.message);
      ToastAndroid.BOTTOM(
        "Error in getting details, try again by reloading app",
        ToastAndroid.LONG
      );
      return;
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
          if (isTripNavigationMode) return; //if active dont allow any marker and popups during trip navigation

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

      {/* show popup based on 2 different modes: explore mode and trip navigation mode */}
      {isTripNavigationMode
        ? isPopupVisible &&
          markerPosition && (
            <TripModePopup
              markerPosition={markerPosition}
              markerData={markerData}
              setIsPopupVisible={setIsPopupVisible}
              tripData={tripData}
              setMarkerPosition={setMarkerPosition}
            />
          )
        : isPopupVisible &&
          markerPosition && (
            <ExploreModePopup
              markerPosition={markerPosition}
              markerData={markerData}
              setIsPopupVisible={setIsPopupVisible}
              tripData={tripData}
            />
          )}
    </>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////
export const styles = StyleSheet.create({
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
