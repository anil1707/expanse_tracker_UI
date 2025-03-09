import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Inptut from "../components/Inptut";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import baseUrl from "../utils/baseUrl";
import CustomButton from "../components/common/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import getToken from "../utils/getToken";
// const getToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem("userToken");
//     if (token !== null) {
//       return token;
//     }
//   } catch (error) {
//     console.error("Error retrieving token:", error);
//   }
//   return null;
// };

const AddTrip = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
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
      if (response.data.message === "Trip Added Successfully!") {
        navigation.navigate("Home");
      } else {
        setErrorMessage(response.data?.message);
      }
    } catch (err) {
      console.log("Failed to add new trip: ", err);
    } finally{
      setLoading(false);
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

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 24, marginVertical: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", top: 10, left: 0 }}>
          <BackButton onPress={() => navigation.navigate("Home")} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>Add Trip</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          height: "20%"
        }}
      >
        <Image
          source={require("../assets/image2.jpg")}
          style={{ width: "100%", height: "100%", borderRadius:10}}
        />
      </View>
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
      <ScrollView style={{ flex: 1}}>
        <View style={{ gap: 5, marginBottom: 15 }}>
          <Text style={{ fontWeight: "bold", color:"gray" }}>Place <Text style={{ color: "red" }}>*</Text></Text>
          <Inptut
            placholder={"Place"}
            onChange={(value) => handleOnChange(value, "place")}
            value={formData.place}
            name={"place"}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold", color:"gray" }}>Country <Text style={{ color: "red" }}>*</Text></Text>
          <Inptut
            placholder={"Country"}
            onChange={(value) => handleOnChange(value, "country")}
            value={formData.country}
            name={"country"}
          />
        </View>
        <TouchableOpacity
          style={{
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingVertical:5,
            borderRadius: 8,
            borderWidth:1, 
            borderColor:"green"
          }}
          onPress={handleAddFriends}
        >
          <Text style={{ color:"green" }}>
            Add Friend
          </Text>
            <Feather
              name="plus"
              size={25}
              color="green"
            />
        </TouchableOpacity>
        <View style={{ marginTop: 10, paddingVertical:5 }}>
          {formData?.friends?.length != 0 &&
            formData?.friends.map((friend, index) => {
              return (
                <View
                  style={{
                    backgroundColor: "lightgray",
                    padding: 10,
                    paddingVertical:6,
                    borderRadius: 8,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                      borderWidth:.5,
                      borderColor:"green"
                    }}
                    name="delete-outline"
                    size={24}
                    color="green"
                    onPress={() => handleRemoveFriend(index, friend.name)}
                  />
                </View>
              );
            })}
        </View>
        <CustomButton
          title={"Add Trip"}
          onPress={handleAddTrip}
          titleStyle={{ fontSize: 18, color: "white" }}
          style={{ marginBottom: 30, marginTop: 10 }}
          loading={loading}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTrip;
