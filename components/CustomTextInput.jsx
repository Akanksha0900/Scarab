import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const CustomTextInput = ({
  title,
  onChangeText,
  onBlur,
  value,
  style,
  placeholder,
  placeholderTextColor = "#999",
  secureTextEntry,
  togglePasswordVisibility,
}) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={styles.label}>{title}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      {title === "Password" && (
        <IconButton
          icon={secureTextEntry ? "eye-off" : "eye"}
          size={20}
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
          color="#999"
        />
      )}
    </View>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 55,
    backgroundColor: "#F9E7E7",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#000",
    fontSize: 17,
  },
  eyeIcon: {
    marginLeft: -42,
  },
});

export default CustomTextInput;
