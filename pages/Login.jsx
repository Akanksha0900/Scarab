import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

const Login = ({ navigation }) => {
  const handleGotoSignUpPage = () => {
    navigation.navigate("Signup");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to Scarab</Text>

      <CustomTextInput title="Email" />
      <CustomTextInput title="Password" />

      <CustomButton
        title="Sign In"
        style={{ width: 200, marginLeft: 100, marginBottom: 15 }}
      />
      <Text style={styles.signupText}>Don't have an account?</Text>
      <TouchableOpacity onPress={handleGotoSignUpPage}>
        <Text style={styles.signupLink}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    marginLeft: 80,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 90,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  signupText: {
    color: "#fff",
    alignSelf: "center",
    marginRight: 45,
    fontSize: 15,
  },
  signupLink: {
    color: "#f5a623",
    fontSize: 15,
    marginLeft: 248,
    marginTop: -18,
  },
});

export default Login;