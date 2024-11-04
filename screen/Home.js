import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useCallback, useState } from "react";
import randomImage from "../assets/randoImage";
import EmptyComponent from "../components/EmptyComponent";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import baseUrl from "../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { addProfile } from "../redux/slices/authSlice";
import getToken from "../utils/getToken";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider, Overlay } from "react-native-elements";

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile);
  const [allTrip, setAllTrip] = useState([]);
  const [clickProfile, setClickProfile] = useState(false);
  const [loader, setLoader] = useState(false);
  const getUserProfile = async () => {
    try {
      const response = await axios.get(baseUrl + "/api/v1/profile", {
        headers: {
          authorization: "Bearer " + (await getToken()),
        },
      });
      dispatch(
        addProfile({
          name: response?.data.userDetail?.name,
          number: response?.data.userDetail?.number,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTrips = async () => {
    setLoader(true);
    try {
      const response = await axios.get(baseUrl + "/api/v1/all-trip", {
        headers: {
          authorization: "Bearer " + (await getToken()),
        },
      });
      setAllTrip(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getAllTrips();
      getUserProfile();
    }, [])
  );
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          width: 150,
          height: 150,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
        }}
        onPress={() => navigation.navigate("Expense", { id: item._id })}
      >
        <View>
          <Image source={randomImage()} style={{ width: 80, height: 80 }} />
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.place}</Text>
          <Text>{item.country}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        <View style={{ height: 40 }}></View>
      </View>
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Failed to remove userToken:", JSON.stringify(error));
    }
  };

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Expensify</Text>
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1.5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
              backgroundColor: "white",
              elevation: 1,
              gap: 5,
            },
          ]}
          onPress={() => setClickProfile(!clickProfile)}
        >
          <FontAwesome name="user-circle" size={20} color="gray" />
          <Text>{userData?.name}</Text>
          {/* <Text style={styles.logoutText} onPress={handleLogout}>
            Logout
          </Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/img3.png")} style={styles.image} />
      </View>
      <View style={styles.recentTripsContainer}>
        <Text style={styles.recentTripsText}>Recent trips</Text>
        <TouchableOpacity
          style={styles.addTripButton}
          onPress={() => {
            navigation.navigate("AddTrip");
          }}
        >
          <Text style={styles.addTripText}>Add Trip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {loader && <ActivityIndicator size="large" />}
        {!loader && (
          <FlatList
            data={allTrip}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ItemSeparatorComponent={<View style={{ padding: 5 }}></View>}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <EmptyComponent message={"You havn't recorded any trip yet"} />
            }
          />
        )}
      </View>
      {clickProfile && (
        <ProfileModal
          clickProfile={clickProfile}
          setClickProfile={setClickProfile}
          handleLogout={handleLogout}
        />
      )}
    </View>
  );
};

const ProfileModal = ({ clickProfile, setClickProfile, handleLogout }) => {
  return (
    <Overlay
      isVisible={clickProfile}
      onBackdropPress={() => setClickProfile(!clickProfile)}
      backdropStyle={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        marginTop: 10,
      }}
      overlayStyle={{
        position: "absolute",
        top: 55,
        right: 30,
        width: 100,
        padding: 10,
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Text>Profile</Text>
      </TouchableOpacity>
      <Divider style={{ width: "100%", height: 1, marginVertical: 5 }} />
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Overlay>
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
  logoutButton: {},
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

export default Home;
