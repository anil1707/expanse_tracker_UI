import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: 50 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/welcome.png")}
          style={{ margin: 40 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 30, margin: 40 }}>
          Expensify
        </Text>
        <View style={{ gap: 40, marginTop: 80 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signin")}
            style={{
              backgroundColor: "green",
              padding: 10,
              width: 270,
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Sing In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={{
              backgroundColor: "green",
              padding: 10,
              width: 270,
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
