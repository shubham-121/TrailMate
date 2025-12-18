import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";

const initialDateOne = new Date();
const initialDateTwo = new Date();

export default function DestinationDescriptionScreen() {
  const [dateOne, setDateOne] = useState(initialDateOne); //from date
  const [dateTwo, setDateTwo] = useState(initialDateTwo); //to date

  const [showDateOne, setShowDateOne] = useState(false);
  const [showDateTwo, setShowDateTwo] = useState(false);

  const { top } = useSafeAreaInsets();
  const { destinationObj } = useLocalSearchParams();

  const destinationData = JSON.parse(destinationObj);

  const [formData, setFormData] = useState({
    destinationId: destinationData.id,
    description: "",
    fromDate: "",
    toDate: "",

    numberOfDays: "",
    daySelector: "",
  });

  // calculate the days difference btw toDate and fromDate after setting toDate
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const daysDifference = calculateDaysBetween(
        formData.fromDate,
        formData.toDate
      );

      console.log("Days difference: ", daysDifference);

      if (daysDifference) {
        setFormData((prev) => ({
          ...prev,
          numberOfDays: String(daysDifference),
        }));
      }
    }
  }, [formData.fromDate, formData.toDate]);

  function handleFormDataChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFormDataSubmission() {
    //Dates validation first else return at first sight
    if (!formData.fromDate || !formData.toDate) {
      alert("Enter From and To dates properly");
      return;
    }

    console.log("Formdata data obj: ", formData);

    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);

    if (from > to) {
      console.log("From date is greater return...");

      setFormData((prev) => ({
        ...prev,
        fromDate: "",
        toDate: "",
      }));
      setDateOne(initialDateOne);
      setDateTwo(initialDateTwo);

      alert("Please Enter The Dates Properly");
      return;
    } else console.log("Everything okay"); //call api

    //cal the api here for submission
  }

  return (
    <View style={{ paddingTop: top }} className="bg-gray-100 h-full">
      {/* Header */}
      <View className="items-center shadow-sm bg-white rounded-xl p-4 mx-3 mt-3">
        <Text className="text-center font-semibold text-lg text-gray-700">
          Add Description / More Details
        </Text>
        <Text className="text-center font-bold text-3xl text-purple-700 mt-1">
          {destinationData.displayName}
        </Text>
      </View>

      {/* Description */}
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

      {/* Date Section logic */}
      <View className="mx-3 mt-6 bg-white rounded-2xl p-5 shadow-md">
        {/* Title */}
        <Text className="text-gray-800 font-semibold text-lg mb-3">
          Visit Date
        </Text>

        {/* Selected Date Display Card */}
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
        </View>

        {/* From Date Picker */}
        {showDateOne && (
          <RNDateTimePicker
            mode="date"
            value={dateOne}
            onChange={(event, selectedDate) => {
              console.log("Event which triggered: ", event);
              console.log("selected date updated:", selectedDate);

              setShowDateOne(false);
              if (selectedDate) {
                setDateOne(selectedDate);
                handleFormDataChange("fromDate", selectedDate);
              }
            }}
          />
        )}

        {/* To Date Picker */}
        {showDateTwo && (
          <RNDateTimePicker
            mode="date"
            value={dateTwo}
            onChange={(event, selectedDate) => {
              console.log("Event which triggered: ", event);
              console.log("selected date updated:", selectedDate);

              setShowDateTwo(false);
              if (selectedDate) {
                setDateTwo(selectedDate);
                handleFormDataChange("toDate", selectedDate);
              }
            }}
          />
        )}
      </View>

      {/* Number of Days */}
      <View className="mx-3 mt-6 bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-gray-700 font-semibold mb-2">
          Number of Days (optional)
        </Text>

        <TextInput
          value={formData.numberOfDays}
          onChangeText={(text) => handleFormDataChange("numberOfDays", text)}
          placeholder="Enter number of days to spend"
          keyboardType="numeric"
          className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
        />
      </View>

      {/* Assign dayLabel */}
      {formData.numberOfDays && (
        <View className="mx-3 mt-6 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-gray-700 font-semibold mb-2">
            Assign to Day
          </Text>
          <Picker
            className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50"
            prompt="Assign The Day"
            mode="dialog"
            selectedValue={formData.daySelector}
            onValueChange={(itemValue, itemIndex) =>
              handleFormDataChange("daySelector", itemValue)
            }
          >
            {new Array(5).fill(0).map((val, indx) => (
              <Picker.Item
                key={indx}
                label={`Day ${indx + 1}`}
                value={indx + 1}
              />
            ))}
          </Picker>
        </View>
      )}

      {/* Buttons */}
      <View className="flex flex-row justify-around mt-8 mx-3 pb-8">
        <Pressable
          className="bg-purple-600 px-6 py-3 rounded-xl shadow"
          onPress={handleFormDataSubmission}
        >
          <Text className="text-white font-semibold text-lg">Save</Text>
        </Pressable>

        <Pressable
          className="bg-gray-300 px-6 py-3 rounded-xl shadow"
          onPress={() => {
            setFormData(() => ({
              // destinationId: "",
              description: "",
              fromDate: "",
              toDate: "",
              numberOfDays: "",
            }));

            setDateOne(initialDateOne);
            setDateTwo(initialDateTwo);
          }}
        >
          <Text className="text-gray-800 font-semibold text-lg">Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

function calculateDaysBetween(fromdDate, toDate) {
  const from = new Date(fromdDate).getTime();
  const to = new Date(toDate).getTime();

  console.log("from and to: ", from, to);

  const daysBetween = (to - from) / (1000 * 60 * 60 * 24);

  console.log("Days btw: ", daysBetween);

  return daysBetween;
}
