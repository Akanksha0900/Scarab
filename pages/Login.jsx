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
import { Formik } from "formik";
import * as Yup from "yup";

// Defining the validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleGoToFeedPage() {
    navigation.navigate("Feed");
  }

  const handleGotoSignUpPage = () => {
    navigation.navigate("Signup");
  };

  const checkCredentials = async (values) => {
    console.log(values.email);

    const userDataString = await AsyncStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : {};
    if (
      userData.email === values.email &&
      userData.password === values.password
    ) {
      handleGoToFeedPage();
    } else {
      alert("User not found with given credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          checkCredentials(values);
          action.resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <CustomTextInput
              title="Email"
              type="text"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <CustomTextInput
              title="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={!passwordVisible}
              togglePasswordVisibility={() =>
                setPasswordVisible(!passwordVisible)
              }
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <CustomButton
              title="Sign In"
              handlePress={handleSubmit}
              style={{ width: 200, marginLeft: 100, marginBottom: 15 }}
            />
            <View style={styles.footer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleGotoSignUpPage}>
                <Text style={styles.signupLink}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontSize: 15,
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
