import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

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
  function handleLogin() {
    navigation.navigate("Login");
  }

  function handleSignUp(values) {
    console.log(values);
    handleLogin(); // For demonstration, navigate to login after signup
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
        Sign Up
      </Text>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <CustomTextInput
              title="Username"
              type="text"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username ? (
              <Text style={{ color: "red", marginLeft: 270, marginTop: -18 }}>
                {errors.username}
              </Text>
            ) : null}

            <CustomTextInput
              title="Email"
              type="text"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={{ color: "red", marginLeft: 270, marginTop: -18 }}>
                {errors.email}
              </Text>
            ) : null}

            <CustomTextInput
              title="Password"
              type="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={{ color: "red", marginLeft: 80 }}>
                {errors.password}
              </Text>
            ) : null}

            <CustomButton
              title="Signup"
              handlePress={handleSubmit}
              style={{ width: 200, marginLeft: 90, marginBottom: 15 }}
            />
            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                marginRight: 45,
                fontSize: 15,
              }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text
                style={{
                  color: "#f5a623",
                  fontSize: 15,
                  marginLeft: 265,
                  marginTop: -22,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
