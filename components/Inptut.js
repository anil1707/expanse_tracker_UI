import { View, Text, TextInput } from "react-native";
import React from "react";

const Inptut = ({ placholder, onChange, value, name, secureTextEntry }) => {
  return (
    <View>
      <TextInput
        style={[
          {
            borderWidth:1,
            backgroundColor: "white",
            width: 300,
            borderRadius: 15,
            paddingVertical: 8,
            paddingHorizontal: 20,
          },
        ]}
        placeholder={placholder}
        onChangeText={onChange}
        value={value}
        name={name}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Inptut;
