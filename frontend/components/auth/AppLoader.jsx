import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTokenLocally } from "../../utils/commonFunctions/authStorage";
import { setCredentials } from "../../redux/slices/authSlice";

// This component will be used to check if there is a token in local storage when the app loads and set the global auth state accordingly
export default function AppLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadLocalStorageToken() {
      const storageToken = await getTokenLocally();

      if (!storageToken) {
        //logout if needed later on
        console.log("No token found in storage 2:", storageToken);
        return;
      }

      console.log("Token found in storage, setting auth state: ", storageToken);

      dispatch(
        setCredentials({
          access_token: storageToken,
          email: "",
          userId: "",
        })
      );
    }
    loadLocalStorageToken();
  }, []);

  return <>{children}</>;
}
