import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

export default function Signup({ Signup }) {
  const handlePress = () => {
    console.log("Hello");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    Signup();
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#161622",
      }}
    >
      <Text
        style={{
          marginLeft: 80,
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 90,
        }}
      >
        Signup to Scarab
      </Text>

      <CustomTextInput title="Username" type="text" />
      <CustomTextInput title="Email" type="text" />
      <CustomTextInput title="Password" type="password" />
      <CustomButton
        title="Signup"
        handlePress={handlePress}
        style={{ width: 200, marginLeft: 120 }}
      />
    </View>
  );
}
