import { View, Text, Image } from "react-native";
import React from "react";
import fuji from "../../assets/images/profile/fuji.jpg";
import userAvatar from "../../assets/images/userAcc/loggedInUser.png";
export default function ProfileHeader() {
  return (
    <View style={{ flex: 1 }} className="bg-gray-200">
      <Image
        source={fuji}
        style={{
          width: "100%",
          height: 220,
          resizeMode: "cover",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      />

      <View
        style={{
          position: "absolute",
          top: 170,
          alignSelf: "center",
          backgroundColor: "white",
          padding: 5,
          borderRadius: 60,
          elevation: 5,
        }}
      >
        <Image
          source={userAvatar}
          style={{ width: 90, height: 90, borderRadius: 45 }}
        />
      </View>
      <View
        style={{
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Shubham</Text>
        <Text style={{ color: "gray" }}>The Explorer</Text>
        <Text style={{ marginTop: 6 }}>
          Chasing sunsets and hidden trails since 2015 ✈️
        </Text>
      </View>
    </View>
  );
}
