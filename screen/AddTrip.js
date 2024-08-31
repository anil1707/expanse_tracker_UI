import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Inptut from "../components/Inptut";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  return null;
};

const AddTrip = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    place: "",
    country: "",
  });
  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTrip = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.198:5000/api/v1/add-trip",
        formData,
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        }
      );
      if(response.data.message === "trip added successfully"){
        navigation.navigate("Home")
      }
    } catch (err) {
      console.log("Failed to add new tirp: ", err);
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
          <BackButton onPress={() => navigation.navigate("Home")} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>Add Trip</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 40,
        }}
      >
        <Image
          source={require("../assets/img7.jpeg")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={{ alignItems: "center", gap: 20 }}>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Where on earth?</Text>
          <Inptut
            placholder={"Place"}
            onChange={(value) => handleOnChange(value, "place")}
            value={FormData.place}
            name={"place"}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Which Country?</Text>
          <Inptut
            placholder={"Country"}
            onChange={(value) => handleOnChange(value, "country")}
            value={FormData.country}
            name={"country"}
          />
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
          onPress={handleAddTrip}
        >
          <Text
            style={{ fontWeight: "semibold", fontSize: 15, color: "white" }}
          >
            Add Trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTrip;
