import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import Inptut from "../components/Inptut";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import baseUrl from "../utils/baseUrl";
import { useSelector } from "react-redux";

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

const AddExpense = (props) => {
  const frientList = useSelector((state) => state.contactDetail);
  const { id, friends } = props.route.params;
  const navigation = useNavigation();
  // Initialize selectedFriends with isChecked
  const [selectedFriends, setSelectedFriends] = useState(
    friends.map((friend) => ({ ...friend, isChecked: true }))
  );

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    trip: id,
  });
  const [activeTab, setActiveTab] = useState("equally");

  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpanse = async () => {
    try {
      const response = await axios.post(
        baseUrl + "/api/v1/addExpense",
        { ...formData, friends: selectedFriends },
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        }
      );
      if (response.data.message === "Expense Added Successfully!") {
        navigation.navigate("Expense", { _id: id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleActiveTab = (active) => {
    if (active === "equally") {
      setActiveTab("equally");
    } else if (active === "unequally") {
      setActiveTab("unequally");
    }
  };

  // Handle selecting/unselecting friends
  const handleFriendSelection = (friendId) => {
    setSelectedFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend._id === friendId
          ? { ...friend, isChecked: !friend.isChecked }
          : friend
      )
    );
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
          <BackButton
            onPress={() => navigation.navigate("Expense", { _id: id })}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
          Add Expense
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 20, marginVertical: 40 }}>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>For What?</Text>
          <Inptut
            placeholder={"Title"}
            onChange={(value) => handleOnChange(value, "title")}
            value={formData.title}
            name={"title"}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>How Much?</Text>
          <Inptut
            placeholder={"Amount"}
            onChange={(value) => handleOnChange(value, "amount")}
            value={formData.amount}
            name={"amount"}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              gap: 150,
              backgroundColor: "lightgray",
              padding: 5,
            }}
          >
            <TouchableOpacity
              style={{
                marginLeft: 8,
                fontWeight: "bold",
                backgroundColor:
                  activeTab === "equally" ? "lightgreen" : "white",
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 15,
              }}
              onPress={() => handleActiveTab("equally")}
            >
              <Text>Equally</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                fontWeight: "bold",
                backgroundColor:
                  activeTab === "unequally" ? "lightgreen" : "white",
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginRight: 8,
              }}
              onPress={() => handleActiveTab("unequally")}
            >
              <Text>Unequally</Text>
            </TouchableOpacity>
          </View>

          {/* Friends list with checkboxes */}
          <View>
            {selectedFriends.length &&
              selectedFriends.map((friend) => {
                const user = frientList.find((f) => {
                  return f.phoneNumber === friend.number;
                });
                return (
                  <View
                    key={friend._id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                      marginTop: 5,
                      backgroundColor: "lightblue",
                      padding: 10,
                    }}
                  >
                    <Text>{user?.name}</Text>
                    <Checkbox
                      value={friend.isChecked}
                      onValueChange={() => handleFriendSelection(friend._id)}
                    />
                  </View>
                );
              })}
          </View>
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
          onPress={handleAddExpanse}
        >
          <Text
            style={{ fontWeight: "semibold", fontSize: 15, color: "white" }}
          >
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExpense;
