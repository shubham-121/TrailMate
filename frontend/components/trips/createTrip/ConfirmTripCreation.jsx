import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { calculateDaysBetween } from "../../../utils/commonFunctions/calculateDaysBetween";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import { formatString } from "../../../utils/commonFunctions/formatString";
import { useSelector } from "react-redux";

const initialDateOne = new Date();
const initialDateTwo = new Date();
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

//Trip confirmation page
export default function ConfirmTripCreation() {
  const { top } = useSafeAreaInsets();

  return (
    <View className="" style={{ paddingTop: top }}>
      <Form />
    </View>
  );
}

function Form() {
  const { tripTitle } = useLocalSearchParams();
  const { destinations } = useSelector((store) => store.createTrip);

  const [dateOne, setDateOne] = useState(initialDateOne); //from date
  const [dateTwo, setDateTwo] = useState(initialDateTwo); //from date

  const [showDateOne, setShowDateOne] = useState(false);
  const [showDateTwo, setShowDateTwo] = useState(false);

  const [formData, setFormData] = useState({
    tripTitle: tripTitle,
    fromDate: "",
    toDate: "",
    numberOfDays: "",
    description: "",
    category: "Other",
    thumbnail: "/path/destination.jpeg",
  });

  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const daysDifference = calculateDaysBetween(
        formData.fromDate,
        formData.toDate
      );

      if (daysDifference) {
        setFormData((prevData) => ({
          ...prevData,
          numberOfDays: String(daysDifference),
        }));
      }
    }
  }, [formData.fromDate, formData.toDate]);

  function handleFormDataChange(name, value) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleFormSubmission() {
    if (!destinations) return; //early return if nothing if none destination exists in redux

    const res = await fetch(`${baseUrl}/trip/saveTrip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer shubham1234",
      },
      body: JSON.stringify({ tripData: destinations, tripDetails: formData }),
    });

    console.log("Trip obj:", destinations);
    console.log("Trip created successfully: ", formData);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" ">
        <Text className="text-center font-semibold text-2xl text-purple-500 ">
          Create Trip: {formatString(tripTitle)}
        </Text>
        <View className="mx-3 mt-6 bg-white rounded-2xl p-5 shadow-md">
          {/* Title */}
          <Text className="text-gray-800 font-semibold text-lg mb-3">
            Trip Date
          </Text>

          {/* From Date */}
          <View className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 mb-4 flex-row justify-between">
            <View className=" px-4 py-0 bg-white shadow-md rounded-lg">
              <Text className="text-gray-500 mb-1 text-sm">From Date</Text>
              <Text className="text-gray-900 font-semibold text-lg">
                {dateOne.toLocaleDateString("en-GB")}
              </Text>

              <Pressable
                className="bg-purple-600 rounded-xl px-3  py-2 self-center shadow-sm"
                onPress={() => setShowDateOne(!showDateOne)}
              >
                <Text className="text-white font-semibold text-base">
                  Choose Date
                </Text>
              </Pressable>
            </View>

            {showDateOne && (
              <RNDateTimePicker
                value={dateOne}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShowDateOne(false);

                  if (selectedDate) {
                    setDateOne(selectedDate);
                    handleFormDataChange("fromDate", selectedDate);
                  }
                }}
              />
            )}

            {/* To Date */}
            <View className=" px-4 py-1 bg-white shadow-md rounded-lg">
              <Text className="text-gray-500 mb-1 text-sm">To Date</Text>

              <Text className="text-gray-900 font-semibold text-lg">
                {dateTwo.toLocaleDateString("en-GB")}
              </Text>

              <Pressable
                className="bg-purple-600 rounded-xl px-3  py-2 self-center shadow-sm"
                onPress={() => setShowDateTwo(!showDateTwo)}
              >
                <Text className="text-white font-semibold text-base">
                  Choose Date
                </Text>
              </Pressable>
            </View>

            {showDateTwo && (
              <RNDateTimePicker
                value={dateTwo}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShowDateTwo(false);

                  if (selectedDate) {
                    setDateTwo(selectedDate);
                    handleFormDataChange("toDate", selectedDate);
                  }
                }}
              />
            )}
          </View>
        </View>
        {/* Number of Days */}
        <View className="mx-3 mt-6 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-gray-700 font-semibold mb-2">
            Total Trip Duration (optional)
          </Text>

          <TextInput
            value={formData.numberOfDays}
            onChangeText={(text) => handleFormDataChange("numberOfDays", text)}
            placeholder="Enter Total Trip Duration"
            keyboardType="numeric"
            className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
          />
        </View>

        {/* category select */}
        <View className="mx-3 mt-6 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-gray-700 font-semibold mb-3">
            Trip Category
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {[
              "Leisure",
              "Adventure",
              "Solo",
              "Family",
              "SightSeeing",
              "Other",
            ].map((item) => {
              const isSelected = formData.category === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => handleFormDataChange("category", item)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected
                      ? "bg-purple-600 border-purple-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      isSelected ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="mx-3 mt-5">
          <Text className="text-gray-700 font-semibold mb-2">Description</Text>

          <TextInput
            value={formData.description}
            onChangeText={(text) => handleFormDataChange("description", text)}
            multiline={true}
            numberOfLines={5}
            placeholder="Enter the destination description..."
            className="border border-gray-300 rounded-xl p-4 bg-white text-base shadow-sm"
            style={{ minHeight: 140, textAlignVertical: "top" }}
          />
        </View>

        <View className="mx-3 mt-5 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-gray-700 font-semibold mb-2">
            Trip Cover Image
          </Text>

          <Pressable className="border border-dashed border-gray-300 rounded-lg h-36 items-center justify-center bg-gray-50">
            <Text className="text-gray-500 text-sm">Tap to upload image +</Text>
          </Pressable>
        </View>

        <View className="items-center">
          <Pressable
            className="m-4 rounded-full px-6 py-3 bg-purple-500/20"
            onPress={handleFormSubmission}
          >
            <Text className="text-center font-semibold text-lg">Save Trip</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

// {showDateTwo && (
//   <RNDateTimePicker mode="date" value={dateTwo} design="material" />
// )}

//category and description, image ,
