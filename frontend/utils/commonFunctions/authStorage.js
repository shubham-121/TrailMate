import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setTokenLocally(token) {
  try {
    await AsyncStorage.setItem("access_token", token);
  } catch (error) {
    console.error("Error in saving the token to local storage", error.message);
  }
}

export async function getTokenLocally() {
  try {
    const localToken = await AsyncStorage.getItem("access_token");

    if (!localToken) {
      console.error("No token found in local storage");
      return;
    }
    console.log("Token found in local storage: ", localToken);
    return localToken;
  } catch (error) {
    console.error(
      "Error in reading the token from local storage",
      error.message
    );
  }
}
