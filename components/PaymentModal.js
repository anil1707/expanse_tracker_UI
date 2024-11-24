import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import getToken from "../utils/getToken";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Inptut from "./Inptut";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./common/CustomButton";

const PaymentModal = ({ setShowPaymentModal, tripId, settleWith }) => {
  const naviagtion = useNavigation();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const body = {
    amount,
    settleWith: settleWith?.phoneNumber,
    paymentMode: "Cash",
  };
  const handlePay = async () => {
    setLoading(true)
    try {
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
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
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
            keyboardType={"numeric"}
          />
          <CustomButton
            title={"Pay"}
            onPress={handlePay}
            titleStyle={{ fontSize: 18, color: "white" }}
            style={{ marginBottom: 30 }}
            loading={loading}
            disabled={loading}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default PaymentModal;
