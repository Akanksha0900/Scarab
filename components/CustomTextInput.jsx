import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const CustomTextInput = ({
  title,
  type,
  onChangeText,
  onBlur,
  value,
  style,
  placeholder,
  placeholderTextColor = "#999", // Default color for placeholder
}) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={styles.label}>{title}</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      secureTextEntry={type === "password"}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor} // Set placeholder text color
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    color: "#F9E7E7",
    fontSize: 20,
    marginBottom: 4,
  },
  input: {
    height: 55,
    backgroundColor: "#F9E7E7",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#000",
    fontSize: 17,
  },
});

export default CustomTextInput;
