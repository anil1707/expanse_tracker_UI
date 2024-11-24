import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Toast from "react-native-root-toast";


const showToast = (message, type = "success") => {
    console.log("message", message, "success", type)
  const backgroundColor = type === "error" ? "red" : "green";


  // Show the toast
  Toast.show("Hello, this is a toast!", {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    backgroundColor:backgroundColor
  });
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex:200
  },
  toastText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default showToast;
