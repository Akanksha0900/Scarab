import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native";

export default function CustomTextInput({ title, type }) {
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
          backgroundColor: "white",
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
      ></TextInput>
    </View>
  );
}
