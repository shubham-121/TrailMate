import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import signupBg from "../../assets/images/auth/signupBg.jpg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  function handleFormChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <RegisterForm
      formData={formData}
      setFormData={setFormData}
      handleFormChange={handleFormChange}
    ></RegisterForm>
  );
}

function RegisterForm({ formData, setFormData, handleFormChange }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  //redux
  const { access_token, authUserData } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();

  //

  async function registerUser() {
    const { email, name, password, phoneNumber } = formData;

    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

    if (!email || !name || !password) {
      alert("Please enter all the required details before registering");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ email, name, password }),
        body: JSON.stringify({
          userName: name,
          userEmail: email,
          userPhoneNumber: phoneNumber,
          userPassword: password,
        }),
      });

      const data = await res.json();

      // console.log("Data is:", data);

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (!data) {
        console.log("Error in registering the user: ", data);
        alert("Error in registering the user");
        return;
      }

      console.log("User registered successfully ", data);
      alert("Registartion successful");

      //dispatch event ->set the authenticated user state globally
      // console.log("Dispatching token:", data.token);
      dispatch(
        setCredentials({
          access_token: data.token,
          email: data.userEmail,
          userId: data.userId,
        })
      );

      //redirecting the user again after successful login
      setTimeout(() => router.replace("/profile"), 1000);
    } catch (error) {
      alert("Error in registering the user", error.message);
      console.log("Error in registering the user: ", error.message);

      return;
    }
  }

  return (
    <View className="flex-1 bg-[#F8F8F8] px-8 pt-16">
      <ImageBackground
        source={signupBg}
        resizeMode="cover"
        className="absolute inset-0"
      />

      <View className="" style={{ marginTop: insets.top }}>
        <Text className="text-center text-[26px] font-bold text-[#1D1D1D]">
          Create Account
        </Text>
        <Text className="text-center text-[16px]  mt-[1%] mb-10 text-black font-semibold">
          Create an account so you can explore all the existing Trails
        </Text>
      </View>

      <View
        style={{
          marginTop: insets.top - 20,
          //   borderWidth: 2,
          padding: 15,
          marginBottom: insets.bottom - 15,
        }}
      >
        {/* Inputs */}

        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-7 text-[14px]"
          placeholder="Name"
          // secureTextEntry
          placeholderTextColor="#999"
          value={formData.name}
          onChangeText={(text) => handleFormChange("name", text)}
        />

        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-5 text-[14px] "
          placeholder="Email"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={(text) => handleFormChange("email", text)}
        />

        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-5 text-[14px]"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
          value={formData.password}
          onChangeText={(text) => handleFormChange("password", text)}
        />

        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-5 text-[14px]"
          placeholder="Phone Number"
          placeholderTextColor="#999"
          value={formData.phoneNumber}
          onChangeText={(text) => handleFormChange("phoneNumber", text)}
        />
      </View>

      <Text
        onPress={() => router.push("/login")}
        className="font-semibold text-[14px]  text-center text-gray-600 underline mb-[1%]"
      >
        Existing User? Login instead
      </Text>

      {/* Button */}
      <TouchableOpacity
        className="bg-[#1F41BB] py-5 rounded-lg items-center mb-7"
        onPress={() => registerUser()}
      >
        <Text className="text-white text-[18px] font-semibold">Sign up</Text>
      </TouchableOpacity>

      <Text className="text-center  mb-5 text-[16px] font-semibold text-black">
        Already have an account
      </Text>

      <Text className="text-center  text-blue-600  font-semibold mb-4">
        Or continue with
      </Text>

      {/* Social Icons */}
      <View className="flex-row justify-evenly gap-x-1">
        <View className="bg-gray-300 px-5 py-3 rounded-[10px]">
          <Image
            source={require("../../assets/images/auth/google.jpg")}
            className="h-6 w-6 rounded-full object-fill"
          />
        </View>

        <View className="bg-gray-300 px-5 py-3 rounded-[10px]">
          <Image
            source={require("../../assets/images/auth/facebook.jpg")}
            className="h-6 w-6 rounded-full object-fill"
          />
        </View>

        <View className="bg-gray-300 px-5 py-3 rounded-[10px]">
          <Image
            source={require("../../assets/images/auth/apple.jpg")}
            className="h-6 w-6 object-fill rounded-full bg-gray-300"
          />
        </View>
      </View>
    </View>
  );
}
