import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./components/AppNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51QDiv0Kskr1hrgEpwgVkJJBteccMEdpwuBoLdZo5OthD3MFoXAAtNLmVgaTVHL8SR8XEF9iwUwQISgUdyeDYlcgA005hD94DYl";
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
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          <RootSiblingParent>
            <AppNavigation token={token} />
          </RootSiblingParent>
        </StripeProvider>
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
