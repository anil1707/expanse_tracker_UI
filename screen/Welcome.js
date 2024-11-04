import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/common/CustomButton";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: 50, paddingHorizontal: 24 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/welcome.png")}
          style={{ margin: 40 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 30, margin: 40 }}>
          Expensify
        </Text>
        <View style={{ gap: 40, marginTop: 80, width: "100%" }}>
          <CustomButton
            title={"Sign In"}
            onPress={() => navigation.navigate("Signin")}
            titleStyle={{ fontSize: 18, color: "white" }}
          />
          <CustomButton
            title={"Sign Up"}
            onPress={() => navigation.navigate("Signup")}
            titleStyle={{ fontSize: 18, color: "white" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
