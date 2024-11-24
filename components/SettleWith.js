import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import PaymentModal from "./PaymentModal";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SettleWith = (props) => {
  const tripId = props.route.params.tripId;
  const naviagtion = useNavigation();
  const friends = useSelector((state) => state.contactDetail);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selecteMember, setSelecteMember] = useState({});
  const handleSettleWith = (selecteMember) => {
    setSelecteMember(selecteMember);
    setShowPaymentModal(true);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Overlay
        animationType="slide"
        overlayStyle={{ height: "100%" }}
        backdropStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginTop: 10,
        }}
        onBackdropPress={() => naviagtion.navigate("Expense", { id: tripId })}
      >
        <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 20 }}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => naviagtion.navigate("Expense", { id: tripId })}
          />
          <View
            style={{
              width: 330,
              paddingTop: 20,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              height: 400,
            }}
          >
            <Text>Settle With</Text>
            {friends?.length > 0 &&
              friends.map((item, index) => {
                console.log("item: ", item);
                if (item?.name !== "You")
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{ width: 300 }}
                      onPress={() => handleSettleWith(item)}
                    >
                      <Text
                        style={{
                          backgroundColor: "lightgray",
                          padding: 10,
                          width: "100%",
                          borderRadius: 10,
                          marginBottom: 10,
                        }}
                      >
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  );
              })}
          </View>
        </View>
      </Overlay>
      {showPaymentModal && (
        <PaymentModal
          setShowPaymentModal={setShowPaymentModal}
          tripId={tripId}
          settleWith={selecteMember}
        />
      )}
    </View>
  );
};

export default SettleWith;
