import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Inptut from "../components/Inptut";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("Token saved successfully");
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const singIn = async () => {
    try {
      const data = await axios.post("http://192.168.1.198:5000/api/v1/signin", {
        ...formData,
      });
      // console.log(data.data);
      return data?.data;
    } catch (error) {
      console.log("Erorr: ", error);
    }
  };
  const handleSignin = async () => {
    const res = await singIn();
    console.log(res);
    saveToken(res?.token);
    if (res?.message == "Login successfully") {
      navigation.goBack();
      navigation.navigate("Home");
    }
  };

  return (
    <View style={{ width: 350, height: 740 }}>
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
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>Sign in</Text>
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
      <View style={{ alignItems: "center", gap: 20 }}>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Email</Text>
          <Inptut
            placholder={"Email"}
            onChange={(value) => handleOnChange(value, "email")}
            value={FormData.email}
            name={"email"}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Password</Text>
          <Inptut
            placholder={"Password"}
            onChange={(value) => handleOnChange(value, "password")}
            value={FormData.password}
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
          onPress={handleSignin}
        >
          <Text
            style={{ fontWeight: "semibold", fontSize: 15, color: "white" }}
          >
            Sing In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;
