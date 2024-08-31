import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import EmptyComponent from "../components/EmptyComponent";
import BackButton from "../components/BackButton";
import { categoryBG } from "../theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
const TripExpenses = (props) => {
  const id = props.route.params._id
  const [expense, setExpense] = useState([]);
  const getExpense = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.198:5000/api/v1/expense/"+id,
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        }
      );
      setExpense(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getExpense();
    }, [])
  );
  const naviagtion = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: categoryBG[item.category],
          padding: 10,
          marginHorizontal: 10,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>
          <Text style={{ fontSize: 13, color: "gray" }}>{item.category}</Text>
        </View>
        <View>
          <Text>{item.amount}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        <View style={{ height: 40 }}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", top: 0, left: 10 }}>
          <BackButton />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>Expenses</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/img3.png")} style={styles.image} />
      </View>
      <View style={styles.recentTripsContainer}>
        <Text style={styles.recentTripsText}>Expenses</Text>
        <TouchableOpacity
          style={styles.addTripButton}
          onPress={() => naviagtion.navigate("AddExpanse", {id:props.route.params._id})}
        >
          <Text style={styles.addTripText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={expense}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ItemSeparatorComponent={<View style={{ padding: 5 }}></View>}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <EmptyComponent message={"You havn't recorded any expense yet"} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  logoutButton: {
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 1,
  },
  logoutText: {
    fontWeight: "600",
    fontSize: 15,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
  recentTripsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  recentTripsText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  addTripButton: {
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 1,
  },
  addTripText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  listContainer: {
    height: 430,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: "red",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 4,
    flex: 1,
  },
});

export default TripExpenses;
