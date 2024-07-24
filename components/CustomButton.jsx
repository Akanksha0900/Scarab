import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function CustomButton({ title, handlePress, style }) {
  return (
    <Button
      onPress={handlePress}
      style={[Styles.button, style]}
      labelStyle={Styles.text}
    >
      {title}
    </Button>
  );
}

const Styles = StyleSheet.create({
  button: {
    alignItems: "stretch",
    padding: 15,
    paddingBottom: 10,
    marginTop: 20,
    height: 62,
    width: 380,
    backgroundColor: "#FF9C01",
    borderRadius: 20,
    // borderWidth: 3,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
