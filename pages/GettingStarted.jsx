import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

// Components to import
import CustomButton from "../components/CustomButton";

export default function GettingStarted() {
  const handlePress = () => {
    console.log("Hello");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.jpeg")} style={styles.dp} />
      <Text
        style={{
          color: "#fff",
          fontSize: 25,
          marginTop: 400,
        }}
      >
        Schedule Posts Effortlessly and {"\n"} Stay Ahead with{" "}
        <Text style={{ color: "orange" }}>Scarab</Text>
      </Text>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={require("../assets/images/path.png")}
        className=""
        resizeMode="contain"
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          padding: 15,
        }}
      >
        Transform Your Workflow with Scarab—Seamlessly Schedule and Manage Your
        Content
      </Text>
      <CustomButton title="Continue with Email" handlePress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 65,
    marginLeft: 88,
    position: "relative",
    marginTop: -15,
  },
  dp: {
    height: 300,
    width: 300,
    borderRadius: 150,
    marginBottom: -300,
    borderWidth: 5,
    borderColor: "orange",
  },
});
