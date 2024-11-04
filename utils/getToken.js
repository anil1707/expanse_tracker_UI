import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        return token;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return null;
  };

  export default getToken;