import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const IconInput = ({
  iconName,
  iconRight,
  iconLeft,
  iconPress,
  secureTextEntry,
  placholder,
  onChange,
  value,
  name,
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <View
      style={[
        styles.inputContainer,
        { borderColor: focused ? "green" : "#ccc" },
      ]}
    >
      {iconLeft && (
        <Icon
          name={iconName}
          size={20}
          color="#888"
          style={{ marginRight: iconLeft ? 10 : 0 }}
          onPress={iconPress}
        />
      )}
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placholder}
        value={value}
        name={name}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
      />
      {iconRight && (
        <Icon name={iconName} size={20} color="#888" onPress={iconPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 7,
    width: "100%",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
  },
});

export default IconInput;
