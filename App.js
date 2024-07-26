import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

// Components to import
import GettingStarted from "./pages/GettingStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Create from "./pages/Create";
import SavedPosts from "./pages/SavedMessages";
import Profile from "./pages/profile";

// Context API import for favorites
import { FavoriteProvider } from "./Contexts/FavoritesContext";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function FeedTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Create") {
            iconName = "add-circle";
          } else if (route.name === "Saved") {
            iconName = "bookmark";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <MaterialIcons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: "#FF9C01",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#161622",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Feed} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Saved" component={SavedPosts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <FavoriteProvider>
          <Stack.Navigator initialRouteName="GettingStarted">
            <Stack.Screen name="Getting Started" component={GettingStarted} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Feed"
              component={FeedTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </FavoriteProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
