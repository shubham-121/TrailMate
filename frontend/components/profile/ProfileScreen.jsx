import { StatusBar, ScrollView } from "react-native";
import React from "react";

import ProfileHeader from "./ProfileHeader";
import UserStats from "./UserStats";
import AccountActions from "./AccountActions";

export default function ProfileScreen() {
  return (
    <>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <ProfileHeader />

        {/* user stats */}
        <UserStats />

        {/* use acc actions */}
        <AccountActions />
      </ScrollView>
    </>
  );
}
