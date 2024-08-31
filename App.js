import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './components/AppNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Welcome from './screen/Welcome';
import Home from './screen/Home';
import AddExpense from './screen/AddExpense';
import AddTrip from './screen/AddTrip';
import TripExpenses from './screen/TripExpenses';
import CameraScreen from './screen/CameraScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigation/>
      {/* <Home/> */}
      {/* <Welcome/>    */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
