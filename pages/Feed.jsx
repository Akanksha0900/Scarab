// feed.jsx

import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../components/CustomTextInput";
import { IconButton } from "react-native-paper";
import { FavoriteContext } from "../Contexts/FavoritesContext";
import Post from "../components/Post";
import StoryBar from "../components/StoryBar";

// Existing posts data
const posts = [
  {
    id: 1,
    username: "Edd",
    avatar: "http://dummyimage.com/220x100.png/cc0000/ffffff",
    image: "http://dummyimage.com/197x100.png/5fa2dd/ffffff",
    caption: "Caught the perfect sunrise this morning!",
    date: "11/25/2023",
    time: "2:34 AM",
  },
  // ... (Include all other hardcoded posts here)
  {
    id: 15,
    username: "Meryl",
    avatar: "http://dummyimage.com/163x100.png/dddddd/000000",
    image: "http://dummyimage.com/206x100.png/5fa2dd/ffffff",
    caption: "Luffy Gear is awesome!",
    date: "11/17/2023",
    time: "8:21 AM",
  },
];

export default function Feed({ navigation }) {
  const { state, dispatch } = useContext(FavoriteContext);
  const { favorites } = state;

  const [userName, setUserName] = useState("");
  const [postsData, setPostsData] = useState(posts); // Initialize with existing posts

  const toggleFavorite = (post) => {
    if (favorites.some((item) => item.id === post.id)) {
      dispatch({ type: "REMOVE_FROM_FAVORITE", payload: post.id });
    } else {
      dispatch({ type: "ADD_TO_FAVORITE", payload: post });
    }
  };

  const fetchUserDetails = async () => {
    const userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    if (userDetails) setUserName(userDetails.name);
  };

  const filterFuturePosts = (storedPosts) => {
    const now = new Date();
    return storedPosts.filter(
      (post) =>
        !post.scheduleDate ||
        !post.scheduleTime ||
        (new Date(post.scheduleDate) <= now &&
          new Date(post.scheduleTime) <= now)
    );
  };

  const fetchPosts = async () => {
    const storedPosts = JSON.parse(await AsyncStorage.getItem("posts")) || [];
    const filteredPosts = filterFuturePosts(storedPosts);
    setPostsData([...filteredPosts, ...posts]); // Combine stored posts with hardcoded posts
  };

  const publishScheduledPosts = async () => {
    const now = new Date();
    const storedPosts = JSON.parse(await AsyncStorage.getItem("posts")) || [];

    const updatedPosts = storedPosts.map((post) => {
      if (
        post.scheduleDate &&
        post.scheduleTime &&
        new Date(post.scheduleDate) <= now &&
        new Date(post.scheduleTime) <= now
      ) {
        // Publish the scheduled post
        post.scheduleDate = null;
        post.scheduleTime = null;
      }
      return post;
    });

    await AsyncStorage.setItem("posts", JSON.stringify(updatedPosts));
    const filteredPosts = filterFuturePosts(updatedPosts);
    setPostsData([...filteredPosts, ...posts]); // Update the posts data
  };

  useEffect(() => {
    fetchUserDetails();
    fetchPosts();

    const interval = setInterval(() => {
      publishScheduledPosts();
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Scarab</Text>
          <IconButton
            icon="message-reply-text"
            iconColor="#FFF"
            size={30}
            onPress={() => navigation.navigate("Messages")}
          />
        </View>
        <View>
          <CustomTextInput
            placeholder={`What's on your mind, ${userName}?`}
            handleFocus={() => navigation.navigate("Create")}
            icon="pencil"
          />
        </View>
        <StoryBar navigation={navigation} />
        <View style={styles.postsContainer}>
          {postsData.map((post) => (
            <Post
              key={post.id}
              post={post}
              toggleFavorite={() => toggleFavorite(post)}
              isFavorite={favorites.some((item) => item.id === post.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 20,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  heading: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  postsContainer: {
    paddingTop: 20,
  },
});
