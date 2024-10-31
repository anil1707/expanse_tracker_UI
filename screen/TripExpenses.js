import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import EmptyComponent from "../components/EmptyComponent";
import BackButton from "../components/BackButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SeeFriend from "../components/SeeFriend";
import baseUrl from "../utils/baseUrl";
import { Overlay } from "react-native-elements";
import Feather from "@expo/vector-icons/Feather";
import formatDate from "../utils/formatDate";
import useContactByNumber from "../utils/getContanstDetail";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, clearContacts } from "../redux/slices/userSlice";
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
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.contactDetail);
  const id = props.route.params._id;
  const navigation = useNavigation();
  const [expense, setExpense] = useState({});
  const [loader, setLoader] = useState(false);
  const [seeFriends, setSeeFriends] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [indivudualGroupExpanse, setIndividualGrouExpanse] = useState({});
  const [groupMembers, setGroupMember] = useState([]);
  const getExpense = async () => {
    setLoader(true);
    try {
      const response = await axios.get(baseUrl + "/api/v1/expense/" + id, {
        headers: {
          authorization: "Bearer " + (await getToken()),
        },
      });
      setExpense(response?.data);
      setGroupMember(response?.data?.friends);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleSeeFriend = () => {
    setSeeFriends(!seeFriends);
  };

  const toggleOverlay = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getGroupExpanse = async () => {
    const response = await axios.get(
      baseUrl + "/api/v1/indivudualGroupExpanse/" + id,
      {
        headers: {
          authorization: "Bearer " + (await getToken()),
        },
      }
    );
    setIndividualGrouExpanse(response.data);
  };
  const getGroupMemberDetails = async () => {
    for (let i = 0; i < expense?.friends?.length; i++) {
      const phoneNumber = expense?.friends[i]?.number;
      let result = await useContactByNumber(phoneNumber);
      if (!result?.error && result?.contactName) {
        if(result?.number === profile?.number){
          dispatch(
            addContacts({ phoneNumber: phoneNumber, name: "You" })
          );
        } else{
          dispatch(
            addContacts({ phoneNumber: phoneNumber, name: result?.contactName })
          );
        }
        
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getExpense();
      getGroupExpanse();
      getGroupMemberDetails();
      dispatch(clearContacts());
    }, [])
  );

  useEffect(() => {
    getGroupMemberDetails();
  }, [groupMembers]);
  const naviagtion = useNavigation();
  const renderItem = ({ item }) => {
    const isLoggedInUserInSplit = item?.splitInto.find(
      (each) => each.number === profile?.number
    );
    let eachValue = +item.amount / item.splitInto.length;
    let lentAmount = isLoggedInUserInSplit
      ? +item.amount - eachValue
      : +item.amount;
    let youInvolved = item?.splitInto.find(
      (user) => user?.number === profile?.number
    );
    return (
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
          setModalData(item);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor:
            profile?.number == item.spendBy.number ? "#e7f7e4" : "#f5ebec",
          padding: 10,
          elevation: 1,
        }}
      >
        <View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {item.title}{" "}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 12 }}>
                {item.spendBy?.number === profile?.number
                  ? "You paid: "
                  : item.spendBy?.name + " paid: "}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>Rs.</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {item.amount}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 12 }}>
              {profile?.number == item.spendBy.number
                ? "You lent"
                : youInvolved !== undefined
                ? "You borrow"
                : "You not involved"}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {profile?.number == item?.spendBy?.number
                ? lentAmount
                : youInvolved !== undefined
                ? eachValue
                : ""}
            </Text>
          </View>
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
          <BackButton
            onPress={() => {
              navigation.navigate("Home");
              dispatch(clearContacts());
            }}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "semibold" }}>
          {expense.name}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {expense &&
          Object.keys(indivudualGroupExpanse) &&
          Object.keys(indivudualGroupExpanse).map((friend, index) => {
            const user = friends?.find((user) => user?.phoneNumber == friend);
            return (
              <Text
                key={index}
                style={{
                  color:
                    indivudualGroupExpanse[
                      Object.keys(indivudualGroupExpanse)[index]
                    ] < 0
                      ? "red"
                      : "green",
                }}
              >
                {user?.name} :{" "}
                {indivudualGroupExpanse[
                  Object.keys(indivudualGroupExpanse)[index]
                ] < 0
                  ? indivudualGroupExpanse[
                      Object.keys(indivudualGroupExpanse)[index]
                    ]
                  : indivudualGroupExpanse[
                      Object.keys(indivudualGroupExpanse)[index]
                    ]}
              </Text>
            );
          })}
      </View>
      <View style={styles.recentTripsContainer}>
        <View>
          <Text style={styles.recentTripsText}>Expenses</Text>
          <TouchableOpacity onPress={handleSeeFriend}>
            <Text style={{ textDecorationLine: "underline", color: "blue" }}>
              Friends
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addTripButton}
          onPress={() =>
            naviagtion.navigate("AddExpanse", {
              id: props.route.params._id,
              friends: expense.friends,
            })
          }
        >
          <Text style={styles.addTripText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      {seeFriends && (
        <SeeFriend
          seeFriends={seeFriends}
          setSeeFriends={setSeeFriends}
          friends={friends}
        />
      )}
      <View style={styles.listContainer}>
        {loader && <ActivityIndicator size={"large"} />}
        {!loader && (
          <FlatList
            data={expense.expenseDoc}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ItemSeparatorComponent={<View style={{ padding: 5 }}></View>}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <EmptyComponent message={"You havn't recorded any expense yet"} />
            }
          />
        )}
      </View>
      {/* show each expanse detail */}
      {isModalVisible && modalData && (
        <Overlay
          isVisible={isModalVisible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            backgroundColor: "white",
            width: 250,
            borderRadius: 10,
            gap: 10,
            padding: 20,
          }}
          backdropStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          animationType="slide"
          fullScreen={false}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Title : </Text>
            <Text style={{ fontSize: 12 }}>{modalData?.title}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Date : </Text>
            <Text style={{ fontSize: 12 }}>
              {formatDate(modalData?.createdAt)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Amound : </Text>
            <Text style={{ fontSize: 12 }}>Rs.{modalData?.amount}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Paid By : </Text>
            <Text style={{ fontSize: 12 }}>{modalData?.spendBy?.name}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              Divided into:{" "}
            </Text>
            <View style={{ marginLeft: 10 }}>
              {modalData &&
                modalData?.splitInto &&
                modalData.splitInto.map((item) => {
                  const user = friends.find(
                    (friend) => friend.phoneNumber === item?.number
                  )
                  return (
                    <View
                      key={item?._id}
                      style={{
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Feather name="circle" size={5} color="black" />
                      <Text style={{ fontSize: 12 }}>{user?.name}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </Overlay>
      )}
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
    // alignItems: "center",
    marginVertical: 20,
    width: 300,
    height: 200,
  },
  image: {},
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
