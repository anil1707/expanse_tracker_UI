import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Settle = ({ tripId, setShowPaymentHistory, showPaymentHistory }) => {
  const navigation = useNavigation();
  const handleSettle = () => {
    navigation.navigate("settleWith", { tripId: tripId });
  };
  const handleHistory = () => {
    setShowPaymentHistory(!showPaymentHistory);
  };
  return (
    <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
      <TouchableOpacity
        onPress={handleSettle}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: 20,
          elevation: 5,
          borderWidth: 1.5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Settle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleHistory}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: 20,
          elevation: 5,
          borderWidth: 1.5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          Payment History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settle;
