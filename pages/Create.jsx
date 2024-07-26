import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const Create = () => {
  return (
    <View>
      <Text style={styles.header}>Create</Text>
    </View>
  );
};

export default Create;

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    marginTop: 0.06 * height,
    marginLeft: 0.08 * width,
  },
});
