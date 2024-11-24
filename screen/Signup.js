import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Inptut from "../components/Inptut";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CustomButton from "../components/common/CustomButton";
import IconInput from "../components/common/IconInput";

const Signup = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    number: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signup = async () => {
    setLoading(true);
    try {
      const data = await axios.post(`${baseUrl}/api/v1/signup`, formData);
      if(data?.data?.success === true) {
        console.log("data: ", data.data);
        navigation.navigate("Signin");
      } else {
        console.log("Error: ", data?.data?.message);
        setErrorMessage(data?.data?.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally{
      setLoading(false);
    }
  };

  const handleSignup = () => {
    signup();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0} // Adjust this if needed
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "absolute", top: 0, left: 10 }}>
              <BackButton onPress={() => navigation.navigate("Welcome")} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
              Sign Up
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 40,
            }}
          >
            <Image
              source={require("../assets/signup.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
          {errorMessage && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errorMessage}
              </Text>
            )}
          <View style={{ alignItems: "center", gap: 20 }}>
            <View style={{ gap: 5, width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Name*</Text>
              <Inptut
                placholder={"User Name"}
                onChange={(value) => handleOnChange(value, "username")}
                value={formData.username}
                name={"username"}
              />
            </View>
            <View style={{ gap: 5, width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Number*</Text>
              <Inptut
                placholder={"Number"}
                onChange={(value) => handleOnChange(value, "number")}
                value={formData.number}
                name={"number"}
                keyboardType="phone-pad"
              />
            </View>
            <View style={{ gap: 5, width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Password*</Text>
              <IconInput
                placholder={"Password"}
                onChange={(value) => handleOnChange(value, "password")}
                value={formData.password}
                name={"password"}
                secureTextEntry={hidePassword}
                iconRight={true}
                iconName={hidePassword ? "eye-off-outline" : "eye-outline"}
                iconPress={() => setHidePassword(!hidePassword)}
              />
            </View>
            <CustomButton
              onPress={handleSignup}
              title={"Sign Up"}
              style={{ marginTop: 20 }}
              titleStyle={{ fontSize: 15, color: "white" }}
              disabled={
                formData.username === "" ||
                formData.number === "" ||
                formData.password === ""
              }
              loading={loading}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text style={{ color: "green" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
