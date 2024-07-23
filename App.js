import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import Signup from "./pages/Signup";
import * as Font from "expo-font";
// Components to import
import CustomButton from "./components/CustomButton";
import { assets } from "./react-native.config";
import GettingStarted from "./pages/GettingStarted";

export default function App() {
  const handlePress = () => {
    console.log("Hello");
  };

  return (
    <PaperProvider>
      <Signup />
    </PaperProvider>
  );
}
