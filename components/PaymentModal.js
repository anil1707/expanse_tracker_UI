import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import getToken from "../utils/getToken";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Inptut from "./Inptut";
import { useNavigation } from "@react-navigation/native";

const PaymentModal = ({ setShowPaymentModal, tripId, settleWith }) => {
  const naviagtion = useNavigation();
  const [amount, setAmount] = useState(0);
  const body = {
    amount,
    settleWith: settleWith?.phoneNumber,
    paymentMode: "Cash",
  };
  const handlePay = async () => {
    const response = await axios.post(
      baseUrl + "/api/v1/settle/" + tripId,
      body,
      {
        headers: {
          authorization: "Bearer " + (await getToken()),
        },
      }
    );
    if (response?.data?.message == "Settled Successfully") {
      setShowPaymentModal(false);
      naviagtion.navigate("Expense", { id: tripId });
    }
  };
  return (
    <View>
      <Overlay
        onBackdropPress={() => setShowPaymentModal(false)}
        backdropStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginTop: 10,
        }}
      >
        <View style={{ padding: 10, gap: 10, paddingVertical: 50 }}>
          <Text>Payment Mode: Cash</Text>
          <Text>Settle With : {settleWith?.name}</Text>
          <Inptut
            value={amount}
            onChange={(amount) => setAmount(amount)}
            name={"amount"}
          />
          <Button title="Pay" onPress={handlePay} />
        </View>
      </Overlay>
    </View>
  );
};

export default PaymentModal;
