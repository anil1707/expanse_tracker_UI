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

const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: "",
    number: "",
    password: "",
  });

  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signup = async () => {
    try {
      const data = await axios.post(`${baseUrl}/api/v1/signup`, formData);
      console.log(data.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSignup = () => {
    signup();
    navigation.goBack();
    navigation.navigate("Signin");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this if needed
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ position: "absolute", top: 0, left: 10 }}>
              <BackButton onPress={() => navigation.navigate("Welcome")} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Sign in</Text>
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
          <View style={{ alignItems: "center", gap: 20 }}>
            <View style={{ gap: 5, width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Name*</Text>
              <Inptut
                placholder={"username"}
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
              />
            </View>
            <View style={{ gap: 5, width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Password*</Text>
              <Inptut
                placholder={"Password"}
                onChange={(value) => handleOnChange(value, "password")}
                value={formData.password}
                name={"password"}
                secureTextEntry={true}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "85%",
              }}
            >
              <TouchableOpacity>
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                width: "85%",
                padding: 10,
                borderRadius: 15,
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={handleSignup}
            >
              <Text style={{ fontWeight: "600", fontSize: 15, color: "white" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
