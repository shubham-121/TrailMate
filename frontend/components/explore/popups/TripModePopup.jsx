import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  endTrip,
  nextDestination,
  previousDestination,
} from "../../../redux/slices/tripNavigationSlice";
import { View, Text, Pressable } from "react-native";
import { styles } from "../MapComponent";

export function TripModePopup({
  markerPosition,
  setMarkerPosition,
  markerData,
  setIsPopupVisible,
  tripData,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  //prettier-ignore
  const {currentDestinationData,currentDestinationIndex,lastDestinationIndex,} = useSelector((store) => store.tripNavigation);

  const isLast = currentDestinationIndex === lastDestinationIndex; //for disabling next btn when last destination is reached
  const isFirst = currentDestinationIndex === 0; //for disabling prev btn when user is on first destination

  function handleCloseTripNavMode() {
    console.log("close modeal");
    dispatch(endTrip());
  }

  console.log("current destination data:", currentDestinationData);

  return (
    <View style={styles.popup}>
      <Text style={styles.popupTitle}>
        Destination {currentDestinationIndex + 1}:
      </Text>

      <Pressable
        className="absolute right-3 top-1  rounded-full border-2 border-gray-400 px-2"
        onPress={() => handleCloseTripNavMode()}
      >
        <Text className="text-xl font-bold text-red-500">X</Text>
      </Pressable>

      <View>
        <Text style={styles.popupTitle}>
          {currentDestinationData.displayName}
        </Text>

        <Text style={styles.popupTitle}>Next: 50 Km</Text>

        {/* <Text style={styles.popupText}>
          {currentDestinationData.destinationDetails.formattedAddress}
        </Text> */}
      </View>
      <View className=" flex-row justify-around">
        <Text
          style={[styles.closeButton, isFirst && { opacity: 0.4 }]}
          onPress={() => {
            currentDestinationIndex > 0 && dispatch(previousDestination());
          }}
        >
          Previous
        </Text>

        <Text
          style={styles.closeButton}
          onPress={() =>
            router.push({
              pathname: "/trips/destinationDetails",
              params: {
                clickedDestinationObj: JSON.stringify(
                  mapForShowDetailsScreen(currentDestinationData)
                ),
              },
            })
          }
        >
          Show Details
        </Text>

        <Text
          style={[styles.closeButton, isLast && { opacity: 0.4 }]}
          onPress={() => {
            currentDestinationIndex < lastDestinationIndex &&
              dispatch(nextDestination());
          }}
        >
          Next
        </Text>
      </View>
    </View>
  );
}

//changes the format of data for the ShowDetailsScreen for reusability of component
function mapForShowDetailsScreen(currDestination) {
  return {
    id: currDestination.destinationId,
    displayName: currDestination.displayName,
    createdAt: currDestination.createdAt,
    fullLocationData: {
      ...currDestination.destinationDetails,
    },
  };
}
