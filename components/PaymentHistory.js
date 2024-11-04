import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Overlay } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import baseUrl from "../utils/baseUrl";
import getToken from "../utils/getToken";
import axios from "axios";
import { useSelector } from "react-redux";
import formatDate from "../utils/formatDate";

const PaymentHistory = ({ tripId, setShowPaymentHistory }) => {
  const friends = useSelector((state) => state.contactDetail);
  const profile = useSelector((state) => state.profile);
  console.log("friends: ", friends);
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
    const response = await axios.get(baseUrl + "/api/v1/history/" + tripId, {
      headers: {
        authorization: "Bearer " + (await getToken()),
      },
    });
    setHistory(response.data);
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <Overlay
      isVisible={true}
      onBackdropPress={() => setShowPaymentHistory(false)}
      overlayStyle={{ height: "100%", width: "100%" }}
      backdropStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginTop: 10,
      }}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => setShowPaymentHistory(false)}
      />

<ScrollView>
      <View
        style={{
          width: 330,
          paddingTop: 20,
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
          {history.length > 0 &&
            history.map((item, index) => {
              // if (item.name !== "You")
              const sendBy = friends.find((friend) => {
                if (friend.phoneNumber === item.sendBy) {
                  return friend.name;
                }
              });
              const receiveBy = friends.find((friend) => {
                if (friend.phoneNumber === item.receiveBy) return friend.name;
              });
              return (
                <View
                  key={index}
                  onPress={() => handleSettleWith(item)}
                  style={{
                    backgroundColor:
                      receiveBy?.phoneNumber === profile?.number
                        ? "#e7f7e4"
                        : sendBy?.phoneNumber !== profile?.number
                        ? "lightgray"
                        : "#f5ebec",
                    padding: 10,
                    width: 300,
                    borderRadius: 10,
                    marginBottom: 10,
                    elevation: 5,
                  }}
                >
                  <Text>Paid by: {sendBy?.name}</Text>
                  <Text>Send to : {receiveBy?.name}</Text>
                  <Text>Amount: {item.amount}</Text>
                  <Text>Date: {formatDate(item.createdAt)}</Text>
                  <Text>Payment Mode: {item.paymentMode}</Text>
                </View>
              );
            })}
      </View>
        </ScrollView>
    </Overlay>
  );
};

export default PaymentHistory;
