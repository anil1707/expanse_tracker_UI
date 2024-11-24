import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const CustomButton = ({ title, onPress, style, titleStyle, disabled, loading }) => {
  return (
    <TouchableOpacity
      style={{
        height: 43,
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor: disabled ? "lightgreen" : "green",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        elevation:5,
        ...style,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={titleStyle}>{title}</Text>
      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
};

export default CustomButton;
