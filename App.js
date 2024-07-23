import { Provider as PaperProvider } from "react-native-paper";
import * as Font from "expo-font";
// Components to import
import { assets } from "./react-native.config";
import GettingStarted from "./pages/GettingStarted";

export default function App() {
  return (
    <PaperProvider>
      <GettingStarted />
    </PaperProvider>
  );
}
