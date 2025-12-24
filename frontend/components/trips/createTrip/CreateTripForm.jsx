import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeDestination } from "../../../redux/slices/createTripSlice";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import homeBg from "../../../assets/images/home/homeBg.avif";
import { useRouter } from "expo-router";

export default function CreateTripForm({ createTripData, setCreateTripData }) {
  const router = useRouter();
  const { destinations } = useSelector((store) => store.createTrip);
  const dispatch = useDispatch();

  const [tripTitle, setTripTitle] = useState("");

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
              value={tripTitle}
              onChangeText={(text) => setTripTitle(text)}
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
            <Pressable
              className="m-4 rounded-full px-6 py-3 bg-purple-500/20"
              onPress={() => {
                if (!tripTitle)
                  return alert(
                    "Enter Trip Name First Before Proceeding Further"
                  );

                router.push({
                  pathname: "/trips/saveTrip",
                  params: { tripTitle },
                });
              }}
            >
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
