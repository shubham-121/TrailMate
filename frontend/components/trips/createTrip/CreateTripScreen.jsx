import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { calculateDaysBetween } from "../../../utils/commonFunctions/calculateDaysBetween";

const initialDateOne = new Date();
const initialDateTwo = new Date();

//Trip confirmation page
export default function CreateTripScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <View className="border-2" style={{ paddingTop: top }}>
      <Form />
    </View>
  );
}

function Form() {
  const [dateOne, setDateOne] = useState(initialDateOne); //from date
  const [dateTwo, setDateTwo] = useState(initialDateTwo); //from date

  const [showDateOne, setShowDateOne] = useState(false);
  const [showDateTwo, setShowDateTwo] = useState(false);

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    numberOfDays: "",
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

  function handleFormSubmission() {
    console.log("Trip created successfully: ", formData);
  }

  return (
    <View className=" ">
      <Text className="text-center font-semibold text-2xl text-purple-500 ">
        Create Trip: Shimla Diaries
      </Text>

      <View className="mx-3 mt-6 bg-white rounded-2xl p-5 shadow-md">
        {/* Title */}
        <Text className="text-gray-800 font-semibold text-lg mb-3">
          Visit Date
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

      <View className="border-2 items-center m-2 p-4">
        <Pressable onPress={() => handleFormSubmission()}>
          <Text> Confirm Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

// {showDateTwo && (
//   <RNDateTimePicker mode="date" value={dateTwo} design="material" />
// )}
