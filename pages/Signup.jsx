import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

export default function Signup({ navigation }) {
  async function handleLogin(values) {
    console.log(values);
    await AsyncStorage.setItem("userData", JSON.stringify(values));
    navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleLogin(values)}
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
              title="Username"
              type="text"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}

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
              type="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <CustomButton
              title="Signup"
              handlePress={handleSubmit}
              style={styles.button}
            />
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.link}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

// getting width information of the device where the application is getting rendered. Accordingly the size of the buttons are given
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontSize: 15,
  },
  button: {
    width: width * 0.6,
    marginVertical: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 15,
  },
  link: {
    color: "#f5a623",
    fontSize: 15,
    marginLeft: 5,
  },
});
