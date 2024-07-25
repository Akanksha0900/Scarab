import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../components/CustomTextInput";
import { IconButton } from "react-native-paper";
import Post from "../components/Post";
import StoryBar from "../components/StoryBar";

const images = {
  people: require("../assets/images/people.jpeg"),
  robo: require("../assets/images/robo.jpeg"),
};

const posts = [
  {
    id: 1,
    image: images.people,
    caption: "Exploring the mountains!",
    isFavorite: false,
  },
  {
    id: 2,
    image: images.robo,
    caption: "Loving the beach vibes!",
    isFavorite: true,
  },
  {
    id: 3,
    image: images.people,
    caption: "Exploring the mountains!",
    isFavorite: false,
  },
  {
    id: 4,
    image: images.robo,
    caption: "Loving the beach vibes!",
    isFavorite: true,
  },
  {
    id: 5,
    image: images.people,
    caption: "Exploring the mountains!",
    isFavorite: false,
  },
  {
    id: 6,
    image: images.robo,
    caption: "Loving the beach vibes!",
    isFavorite: true,
  },
  // Add more posts as needed
];

export default function Feed({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : {};
      setUserName(userData.name);
    };
    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.username}>{userName}</Text>
      <View style={styles.search}>
        <CustomTextInput placeholder="Search User" />
        <IconButton
          icon="magnify"
          size={35}
          onPress={() => {}}
          style={styles.searchIcon}
        />
      </View>
      <StoryBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
}

// Extract screen dimension
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 16,
  },
  header: {
    color: "#aaa",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 0.06 * height,
    marginLeft: 0.08 * width,
  },
  username: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 0.08 * width,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchIcon: {
    marginLeft: width * 0.05,
    color: "black",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
