import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, onPress, style, titleStyle }) => {
  return (
    <TouchableOpacity
      style={{
        height: 43,
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        elevation:5,
        ...style,
      }}
      onPress={onPress}
    >
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
