import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./components/AppNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const GetToken = async () => {
    setIsLoading(true);
    try {
      let newToken = await AsyncStorage.getItem("userToken");
      setToken(newToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      setIsLoading(false);
    }
    return null;
  };
  useEffect(() => {
    GetToken();
  }, []);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <AppNavigation token={token} />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
  },
});
