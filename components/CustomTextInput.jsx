import React from "react";
import { TextInput, Text, View } from "react-native";

export default function CustomTextInput({
  title,
  type,
  onChangeText,
  onBlur,
  value,
}) {
  return (
    <View>
      <Text
        style={{
          color: "white",
          marginLeft: 40,
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          backgroundColor: "#F9E7E7",
          marginLeft: 30,
          height: 60,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          fontSize: 20,
          borderRadius: 20,
        }}
        secureTextEntry={type === "password"}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
    </View>
  );
}
