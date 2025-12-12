import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

export default function DestinationDescriptionScreen() {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const { top } = useSafeAreaInsets();
  const { destinationObj } = useLocalSearchParams();

  const destinationData = JSON.parse(destinationObj);

  console.log("destinationObj: ", destinationData);

  const [formData, setFormData] = useState({
    destinationId: destinationData.id,
    description: "",
    date: "",
    numberOfDays: "",
  });

  function handleFormDataChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          onChangeText={handleFormDataChange}
          multiline={true}
          numberOfLines={5}
          placeholder="Enter the destination description..."
          className="border border-gray-300 rounded-xl p-4 bg-white text-base shadow-sm"
          style={{ minHeight: 140, textAlignVertical: "top" }}
        />
      </View>

      {/* Date Section */}
      <View className="mx-3 mt-6 bg-white rounded-2xl p-5 shadow-md">
        {/* Title */}
        <Text className="text-gray-800 font-semibold text-lg mb-3">
          Visit Date
        </Text>

        {/* Selected Date Display Card */}
        <View className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 mb-4">
          <Text className="text-gray-500 mb-1 text-sm">Selected Date</Text>
          <Text className="text-gray-900 font-semibold text-lg">
            {date.toLocaleDateString("en-GB")}
          </Text>
        </View>

        {/* Choose Date Button */}
        <Pressable
          className="bg-purple-600 rounded-xl px-5 py-3 self-center shadow-sm"
          onPress={() => setShowDate(!showDate)}
        >
          <Text className="text-white font-semibold text-base">
            Choose Date
          </Text>
        </Pressable>

        {/* Date Picker */}
        {showDate && (
          <RNDateTimePicker
            mode="date"
            value={date}
            onChange={(event, selectedDate) => {
              console.log("Event which triggered: ", event);
              console.log("selected date updated:", selectedDate);

              setShowDate(false);
              if (selectedDate) setDate(selectedDate);
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
          placeholder="Enter number of days to spend"
          keyboardType="numeric"
          className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
        />
      </View>

      {/* Buttons */}
      <View className="flex flex-row justify-around mt-8 mx-3 pb-8">
        <Pressable className="bg-purple-600 px-6 py-3 rounded-xl shadow">
          <Text className="text-white font-semibold text-lg">Save</Text>
        </Pressable>

        <Pressable className="bg-gray-300 px-6 py-3 rounded-xl shadow">
          <Text className="text-gray-800 font-semibold text-lg">Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}
