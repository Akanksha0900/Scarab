import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Components to import
import GettingStarted from "./pages/GettingStarted";
import Signup from "./pages/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GettingStarted">
          <Stack.Screen name="Getting Started" component={GettingStarted} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
