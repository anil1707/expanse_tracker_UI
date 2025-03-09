import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import Inptut from "../components/Inptut";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import baseUrl from "../utils/baseUrl";
import { useSelector } from "react-redux";
import CustomButton from "../components/common/CustomButton";

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
  // console.log("firendList: ", friends);
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
  const [amountPerUser, setAmountPerUser] = useState({});
  const [activeTab, setActiveTab] = useState("equally");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountPerUserOnChange = (index, amount, id, number) => {
    setAmountPerUser((prev) => ({ ...prev, [id]: amount }));
  };

  const handleAddExpanseUnequally = async () => {
    setLoading(true);
    const obj = [];
    friends.forEach((friend) => {
      if (amountPerUser.hasOwnProperty(friend?._id)) {
        obj.push({
          number: friend?.number,
          amount: amountPerUser[friend?._id],
          equally: false,
        });
      }
    });
    try {
      const response = await axios.post(
        baseUrl + "/api/v1/addExpenseUnequally",
        { ...formData, expanseArr: obj },
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        }
      );
      if (response.data.message === "Expense Added Successfully!") {
        navigation.navigate("Expense", { id: id });
      } else {
        setErrorMessage(response.data?.message);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpanse = async () => {
    setLoading(true);
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
        navigation.navigate("Expense", { id: id });
      } else {
        setErrorMessage(response.data?.message);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.response?.data?.message);
    } finally {
      setLoading(false);
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
    <View style={{paddingHorizontal: 24, flex:1 }}>
      {/* header container */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", top: 10, left: 0 }}>
          <BackButton
            onPress={() => navigation.navigate("Expense", { id: id })}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
          Add Expense
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            gap: 10,
            marginVertical: 40,
            width: "100%",
            // backgroundColor: "red",
            // flex: 1
          }}
        >
          <Image
            source={require("../assets/addExpense.jpeg")}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
          {/* title container */}
          <View style={{ gap: 5, width: "100%" }}>
            <Text style={{ fontWeight: "bold" }}>For What?</Text>
            <Inptut
              placholder={"Title"}
              onChange={(value) => handleOnChange(value, "title")}
              value={formData.title}
              name={"title"}
            />
          </View>
          {/* amount container */}
          <View style={{ gap: 5, width: "100%" }}>
            <Text style={{ fontWeight: "bold" }}>How Much?</Text>
            <Inptut
              placholder={"Amount"}
              onChange={(value) => handleOnChange(value, "amount")}
              value={formData.amount}
              name={"amount"}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ width: "100%" }}>
            {/* type of expense */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  fontWeight: "bold",
                  backgroundColor:
                    activeTab === "equally" ? "green" : "white",
                  borderRadius: 20,
                  paddingVertical: 7,
                  paddingHorizontal: 25,
                  borderWidth:1,
                  borderColor:"green"
                }}
                onPress={() => handleActiveTab("equally")}
              >
                <Text style={{color:activeTab === "equally" ? "white" : "green",}}>Equally</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  fontWeight: "bold",
                  backgroundColor:
                    activeTab === "unequally" ? "green" : "white",
                  borderRadius: 20,
                  paddingVertical: 7,
                  paddingHorizontal: 25,
                  borderColor:"green",
                  borderWidth:1
                }}
                onPress={() => handleActiveTab("unequally")}
              >
                <Text style={{color:activeTab === "unequally" ? "white" : "green",}}>Unequally</Text>
              </TouchableOpacity>
            </View>

            {/* Friends list with checkboxes (for qually) */}
            {activeTab === "equally" && (
              <View style={{ width: "100%", justifyContent: "center" }}>
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
                          backgroundColor: "white",
                          padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          borderWidth:.3,
                          borderColor:"green"
                        }}
                      >
                        <Text style={{color:"green"}}>{user?.name}</Text>
                        <Checkbox
                          value={friend.isChecked}
                          onValueChange={() =>
                            handleFriendSelection(friend._id)
                          }
                        />
                      </View>
                    );
                  })}
              </View>
            )}
            {/* Friends list with amount (for unequally) */}
            {activeTab === "unequally" && (
              <View style={{ width: "100%", justifyContent: "center" }}>
                {friends.length &&
                  friends.map((friend, index) => {
                    const user = frientList.find((f) => {
                      return f.phoneNumber === friend.number;
                    });
                    // console.log("user: ", user);
                    return (
                      <View
                        key={friend._id}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingLeft: 10,
                          marginTop: 5,
                          backgroundColor: "white",
                          // padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          alignItems: "center",
                          borderWidth:.3,
                          borderColor:"green"
                        }}
                      >
                        <Text style={{ margin: 10, color:"green" }}>{user?.name}</Text>
                        <TextInput
                          id={friend._id}
                          style={{
                            borderRadius: 10,
                            height: "99%",
                            width: 70,
                            backgroundColor: "lightgray",
                            paddingHorizontal: 10,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                          placeholder="Rs."
                          placeholderTextColor="gray"
                          keyboardType="phone-pad"
                          value={setAmountPerUser[index]?.amount}
                          onChangeText={(value) =>
                            handleAmountPerUserOnChange(
                              index,
                              value,
                              friend._id,
                              user?.phoneNumber
                            )
                          }
                        />
                      </View>
                    );
                  })}
              </View>
            )}
          </View>
          {errorMessage && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errorMessage}
            </Text>
          )}
          <CustomButton
            title={"Add Expense"}
            onPress={
              activeTab === "equally"
                ? handleAddExpanse
                : handleAddExpanseUnequally
            }
            titleStyle={{ fontSize: 18, color: "white"}}
            disabled={formData.title === "" || formData.amount === ""}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddExpense;
