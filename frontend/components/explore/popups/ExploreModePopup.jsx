import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { createTrip } from "../../../redux/slices/createTripSlice";
import { styles } from "../MapComponent";

export function ExploreModePopup({
  markerPosition,
  markerData,
  setIsPopupVisible,
  tripData,
}) {
  const dispatch = useDispatch();

  return (
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
  );
}
