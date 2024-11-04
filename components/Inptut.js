import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const Inptut = ({
  placholder,
  onChange,
  value,
  name,
  secureTextEntry,
  keyboardType,
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <View>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        style={[
          {
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 7,
            paddingHorizontal: 20,
            borderColor: focused ? "green" : "#ccc",
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
