import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import Inptut from "../components/Inptut";
const category = ["food", "shopping", "entertainment", "commute"];
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

const AddExpense = (props) => {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    trip: id,
  });
  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddExpanse = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.198:5000/api/v1/addExpense",
        formData,
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        navigation.navigate("Expense", { _id: id });
      }
      // setExpense(response?.data);
    } catch (err) {
      console.log(err);
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
          <BackButton onPress={() => navigation.navigate("Expense")} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
          Add Expense
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
          source={require("../assets/img2.jpeg")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={{ alignItems: "center", gap: 20 }}>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>For What?</Text>
          <Inptut
            placholder={"Title"}
            onChange={(value) => handleOnChange(value, "title")}
            value={FormData.title}
            name={"title"}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold" }}>How Much?</Text>
          <Inptut
            placholder={"Amount"}
            onChange={(value) => handleOnChange(value, "amount")}
            value={FormData.amount}
            name={"amount"}
          />
        </View>
        <View style={{ width: "88%" }}>
          <Text style={{ fontWeight: "bold" }}>Category</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 5,
            }}
          >
            {category &&
              category.map((cat) => {
                let bColor = "white";
                if (cat == formData.category) bColor = "lightgreen";

                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: `${bColor}`,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 15,
                      flexWrap: "wrap",
                    }}
                    key={cat}
                    onPress={() => handleOnChange(cat, "category")}
                  >
                    <Text>{cat}</Text>
                  </TouchableOpacity>
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
