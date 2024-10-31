import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Inptut from "../components/Inptut";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import baseUrl from "../utils/baseUrl";
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
    friends: [],
  });
  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTrip = async () => {
    console.log("formData: ", formData);
    try {
      const response = await axios.post(
        baseUrl + "/api/v1/add-trip",
        formData,
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        }
      );
      console.log(response.data);
      if (response.data.message === "Trip Added Successfully!") {
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log("Failed to add new trip: ", err);
    }
  };

  const handleAddFriends = () => {
    let getContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const data = await Contacts.presentContactPickerAsync();
          const phoneWithoutCountryCode = data.phoneNumbers[0].number.replace(
            /^\+\d{1,2}(?=\s|\d)/,
            ""
          );

          const formattedPhoneNumber = phoneWithoutCountryCode.replace(
            /\s+/g,
            ""
          );

          console.log(formattedPhoneNumber);
          if (data !== null)
            setFormData((prev) => ({
              ...prev,
              friends: [
                ...formData.friends,
                { name: data.name, number: formattedPhoneNumber },
              ],
            }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  };

  const handleRemoveFriend = (index, name) => {
    let newFriends = formData.friends.filter((item, i) => {
      return i != index;
    });
    setFormData((prev) => ({
      ...prev,
      friends: [...newFriends],
    }));
  };

  console.log(formData);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, marginVertical: 10 }}
    >
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
      <View style={{ flex: 1 }}>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Where on earth?</Text>
          <Inptut
            placholder={"Place"}
            onChange={(value) => handleOnChange(value, "place")}
            value={formData.place}
            name={"place"}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Which Country?</Text>
          <Inptut
            placholder={"Country"}
            onChange={(value) => handleOnChange(value, "country")}
            value={formData.country}
            name={"country"}
          />
        </View>
        <TouchableOpacity
          onPress={handleAddFriends}
          style={{
            backgroundColor: "lightgreen",
            width: "85%",
            padding: 10,
            borderRadius: 15,
            alignItems: "center",
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <Text>Add Friends</Text>
        </TouchableOpacity>
        <ScrollView style={{ marginTop: 20 }}>
          {formData?.friends?.length != 0 &&
            formData?.friends.map((friend, index) => {
              return (
                <View
                  style={{
                    backgroundColor: "lightblue",
                    padding: 10,
                    borderRadius: 8,
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                  key={index}
                >
                  <Text>{friend.name}</Text>
                  <MaterialCommunityIcons
                    style={{
                      backgroundColor: "white",
                      borderRadius: 50,
                      padding: 2,
                    }}
                    name="delete-outline"
                    size={24}
                    color="black"
                    onPress={() => handleRemoveFriend(index, friend.name)}
                  />
                </View>
              );
            })}
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            width: "85%",
            padding: 10,
            borderRadius: 15,
            alignItems: "center",
            marginTop: 20,
            alignSelf: "center",
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
    </SafeAreaView>
  );
};

export default AddTrip;
