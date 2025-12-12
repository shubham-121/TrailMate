import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  deActivateCreateTripModal,
  removeDestination,
} from "../../../redux/slices/createTripSlice";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import homeBg from "../../../assets/images/home/homeBg.avif";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

export function CreateTripDrawer({ isCreatingTrip }) {
  const [createTripData, setCreateTripData] = useState(null);

  const dispatch = useDispatch();
  const collapsedHeight = 100; // minimized drawer height
  const expandedHeight = height * 0.6; // full drawer height

  // Animated value for drawer height
  const translateY = useRef(new Animated.Value(collapsedHeight)).current;
  const currentHeight = useRef(collapsedHeight);

  const { destinations } = useSelector((store) => store.createTrip);

  // PanResponder for dragging the drawer
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        let newHeight = currentHeight.current - gestureState.dy;
        newHeight = Math.max(
          collapsedHeight,
          Math.min(expandedHeight, newHeight)
        );
        translateY.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        // If swiped up, expand; if down, collapse
        if (gestureState.dy < 0) {
          Animated.spring(translateY, {
            toValue: expandedHeight,
            useNativeDriver: false,
          }).start(() => (currentHeight.current = expandedHeight));
        } else {
          Animated.spring(translateY, {
            toValue: collapsedHeight,
            useNativeDriver: false,
          }).start(() => (currentHeight.current = collapsedHeight));
        }
      },
    })
  ).current;

  if (!isCreatingTrip) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View
        style={[styles.drawer, { height: translateY }]}
        pointerEvents="auto"
      >
        {/* Handle for dragging */}
        <View {...panResponder.panHandlers} style={styles.handle} />

        <View className=" flex-row justify-between  items-center">
          <Text className="text-lg font-bold ">Trip Drawer</Text>

          <Text
            className="text-lg font-bold  text-red-600 "
            onPress={() => dispatch(deActivateCreateTripModal())}
          >
            Close
          </Text>
        </View>

        <CreateTripForm
          createTripData={createTripData}
          setCreateTripData={setCreateTripData}
        ></CreateTripForm>
      </Animated.View>
    </View>
  );
}

function CreateTripForm({ createTripData, setCreateTripData }) {
  const router = useRouter();
  const { destinations } = useSelector((store) => store.createTrip);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Destination obj updated : ", destinations);
  }, [destinations]);

  //function for navigating to the destination details screen
  function handleShowDetails(filterId) {
    if (!(destinations.length > 0)) return; //early return , no need to check for emoty destination

    const clickedDestination = destinations.find(
      (dest) => dest.id === filterId
    );

    // console.log("Filter id:", filterId);

    // console.log("Show details clicked for destination with id: ", clickedTrip);

    router.push({
      pathname: "/trips/destinationDetails",
      params: { clickedDestinationObj: JSON.stringify(clickedDestination) },
    });
  }

  return (
    <ScrollView>
      <View className="border-2 m-2">
        {!(destinations.length > 0) ? (
          // ask user to add destination, if no destination present

          <View className=" shadow-lg bg-white rounded-lg p-2 m-2">
            <Text className="font-semibold text-lg text-center ">
              Create your trip now by adding location
            </Text>
          </View>
        ) : (
          // else render the destination is present

          <View className="px-4 py-3">
            <Text className="text-gray-600 font-medium tracking-tight mb-2 text-center">
              Trip Name
            </Text>

            <TextInput
              placeholder="e.g. Shimla Diaries"
              className="border border-gray-300 rounded-md px-3 py-2 text-[15px] bg-white shadow-sm font-medium"
            />
          </View>
        )}

        {/* render the trips */}
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          data={destinations}
          renderItem={({ item, index }) => (
            <View className="bg-stone-100 rounded-xl shadow-lg m-2 p-3 flex flex-row">
              {/* Thumbnail */}
              <View className="mr-3">
                <Image
                  source={homeBg}
                  style={{ height: 90, width: 90, borderRadius: 12 }}
                />
              </View>

              {/* Content */}
              <View className="flex-1 justify-between">
                <View>
                  <Text className="text-base font-semibold text-gray-800">
                    {index + 1}. {item.displayName}
                  </Text>

                  <Text className="text-xs text-gray-500 mt-1">
                    Tap Add Description to customize this stop
                  </Text>
                </View>

                {/* Buttons */}
                <View className="mt-3 gap-2 flex flex-row">
                  <Pressable
                    className="bg-blue-100 rounded-lg py-1 w-20"
                    onPress={() => handleShowDetails(item.id)}
                  >
                    <Text className="text-blue-700 text-sm text-center">
                      Show Details
                    </Text>
                  </Pressable>

                  <Pressable
                    className="bg-red-100 rounded-lg py-1 w-20"
                    onPress={() =>
                      dispatch(removeDestination({ filterId: item.id }))
                    }
                  >
                    <Text className="text-red-600 text-sm text-center">
                      Remove Destination
                    </Text>
                  </Pressable>

                  <Pressable
                    className="bg-gray-200 rounded-lg py-1 w-20"
                    onPress={() =>
                      router.push({
                        pathname: "/trips/addDescription",
                        params: { destinationObj: JSON.stringify(item) },
                      })
                    }
                  >
                    <Text className="text-gray-700 text-sm text-center">
                      Add Description
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />

        {/* save trip to backend */}
        {destinations.length > 0 && (
          <View className="items-center">
            <Pressable className="m-4 rounded-full px-6 py-3 bg-purple-500/20">
              <Text className="text-center font-semibold text-lg">
                Save Trip
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 12,
  },
});
