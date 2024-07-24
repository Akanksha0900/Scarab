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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  function handleGoToFeedPage() {
    navigation.navigate("Feed");
  }

  const handleGotoSignUpPage = () => {
    navigation.navigate("Signup");
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const checkCredentials = async () => {
    const userDataString = await AsyncStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : {};
    if (userData.email === loginEmail && userData.password === loginPassword) {
      handleGoToFeedPage();
    } else {
      alert("User not found with given credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <CustomTextInput title="Email" onChangeText={setLoginEmail} />
      <CustomTextInput title="Password" onChangeText={setLoginPassword} />

      <CustomButton
        title="Sign In"
        handlePress={checkCredentials}
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
    textAlign: "center",
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
