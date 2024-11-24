import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewBase,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Inptut from "../components/Inptut";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../utils/baseUrl";
import CustomButton from "../components/common/CustomButton";
import IconInput from "../components/common/IconInput";

const Signin = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [formData, setFormData] = useState({
    number: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("Token saved successfully");
    } catch (error) {
      setErrorMessage(error?.message);
      console.error("Error saving token:", error);
    }
  };

  const singIn = async () => {
    setLoading(true);
    try {
      const data = await axios.post(`${baseUrl}/api/v1/signin`, {
        ...formData,
      });
      return data?.data;
    } catch (error) {
      console.log("Erorr: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignin = async () => {
    const res = await singIn();
    console.log(res);
    if (res?.message == "Login successfully") {
      saveToken(res?.token);
      navigation.goBack();
      navigation.navigate("Home");
    } else {
      setErrorMessage(res?.message);
    }
  };

  console.log("errorMessage", !formData.number || !formData.password);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      enabled={true}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: 350, height: 740, paddingHorizontal: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <View style={{ position: "absolute", top: 0, left: 10 }}>
              <BackButton onPress={() => navigation.navigate("Welcome")} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
              Sign in
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
              source={require("../assets/login.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
          {errorMessage && <Text style={{ color: "red", marginBottom:10 }}>{errorMessage}</Text>}
          <View style={{ alignItems: "center", gap: 20 }}>
            <View style={{ gap: 5, width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Number*</Text>
              <Inptut
                placholder={"Number"}
                onChange={(value) => handleOnChange(value, "number")}
                value={FormData.number}
                name={"number"}
                keyboardType="phone-pad"
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Password*</Text>
              <IconInput
                iconRight={true}
                iconName= {!hidePassword ? "eye-outline" : "eye-off-outline"}
                iconPress={() => {
                  setHidePassword(!hidePassword);
                }}
                secureTextEntry={hidePassword}
                placholder={"Password"}
                onChange={(value) => handleOnChange(value, "password")}
                value={FormData.password}
                name={"password"}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <TouchableOpacity>
                <Text style={{color:"green"}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              onPress={handleSignin}
              title={"Sign In"}
              style={{ marginTop: 20 }}
              titleStyle={{ fontSize: 15, color: "white" }}
              disabled={!formData.number || !formData.password}
              loading={loading}
            />
          </View>
          <View style={{ marginTop: 20, flexDirection: "row", justifyContent:"center" }}>
            <Text>Don't have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")} ><Text style={{color:"green"}}>Sign Up</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signin;
