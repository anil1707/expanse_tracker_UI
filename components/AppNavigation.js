import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screen/Welcome";
import Home from "../screen/Home";
import { View } from "react-native";
import AddTrip from "../screen/AddTrip";
import AddExpense from "../screen/AddExpense";
import TripExpenses from "../screen/TripExpenses";
import Signin from "../screen/Signin";
import Signup from "../screen/Signup";

const Stack = createStackNavigator();

const AppNavigation = ({token}) => {
  
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={token ? "Home" : "Welcome"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTrip" component={AddTrip} />
          <Stack.Screen name="AddExpanse" component={AddExpense} />
          <Stack.Screen name="Expense" component={TripExpenses} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen
            name="Signin"
            options={{ presentation: "modal" }}
            component={Signin}
          />
          <Stack.Screen
            name="Signup"
            options={{ presentation: "modal" }}
            component={Signup}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigation;
