// feed.jsx

import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../components/CustomTextInput";
import { IconButton } from "react-native-paper";
import { FavoriteContext } from "../Contexts/FavoritesContext";
import Post from "../components/Post";

const images = {
  img1: require("../assets/posts/img1.jpg"),
  img2: require("../assets/posts/img2.jpg"),
  img3: require("../assets/posts/img3.jpeg"),
  img4: require("../assets/posts/img4.jpeg"),
  img5: require("../assets/posts/img5.jpeg"),
  img6: require("../assets/posts/img6.jpeg"),
  img7: require("../assets/posts/img7.jpeg"),
  img8: require("../assets/posts/img8.jpeg"),
  img9: require("../assets/posts/img9.jpeg"),
  img10: require("../assets/posts/img10.jpeg"),
  img11: require("../assets/posts/img11.jpg"),
  img12: require("../assets/posts/img12.jpg"),
  img13: require("../assets/posts/img13.jpg"),
  img14: require("../assets/posts/img14.jpeg"),
  img15: require("../assets/posts/img15.png"),

  av1: require("../assets/avatars/av1.jpg"),
  av2: require("../assets/avatars/av2.jpg"),
  av3: require("../assets/avatars/av3.jpg"),
  av4: require("../assets/avatars/av4.jpg"),
  av5: require("../assets/avatars/av5.jpg"),
  av6: require("../assets/avatars/av6.jpg"),
  av7: require("../assets/avatars/av7.jpg"),
  av8: require("../assets/avatars/av8.jpg"),
  av9: require("../assets/avatars/av9.jpg"),
  av10: require("../assets/avatars/av10.jpg"),
  av11: require("../assets/avatars/av11.jpg"),
  av12: require("../assets/avatars/av12.jpg"),
  av13: require("../assets/avatars/av13.jpg"),
  av14: require("../assets/avatars/av14.jpg"),
  av15: require("../assets/avatars/av15.jpg"),
};

const posts = [
  {
    id: 1,
    username: "Edd",
    avatar: images.av1,
    image: images.img1,
    caption: "Caught the perfect sunrise this morning!",
    date: "11/25/2023",
    time: "2:34 AM",
  },
  {
    id: 2,
    username: "Brook",
    avatar: images.av2,
    image: images.img2,
    caption: "My cat loves this spot by the window.",
    date: "7/8/2024",
    time: "2:56 AM",
  },
  {
    id: 3,
    username: "Heywood",
    avatar: images.av3,
    image: images.img3,
    caption: "Morning run through the forest.",
    date: "10/7/2023",
    time: "7:39 AM",
  },
  {
    id: 4,
    username: "Ashlen",
    avatar: images.av4,
    image: images.img4,
    caption: "Strolling through the park this afternoon.",
    date: "9/30/2023",
    time: "3:37 PM",
  },
  {
    id: 5,
    username: "Ossie",
    avatar: images.av5,
    image: images.img5,
    caption: "Night owl thoughts.",
    date: "11/1/2023",
    time: "2:58 AM",
  },
  {
    id: 6,
    username: "Alma",
    avatar: images.av6,
    image: images.img6,
    caption: "Found a rare bird during my morning hike!",
    date: "11/23/2023",
    time: "7:55 AM",
  },
  {
    id: 7,
    username: "Herby",
    avatar: images.av7,
    image: images.img7,
    caption: "Winter wonderland is here!",
    date: "12/21/2023",
    time: "7:40 AM",
  },
  {
    id: 8,
    username: "Raeann",
    avatar: images.av8,
    image: images.img8,
    caption: "Catching up on my favorite sci-fi series.",
    date: "1/13/2024",
    time: "3:32 PM",
  },
  {
    id: 9,
    username: "Mariska",
    avatar: images.av9,
    image: images.img9,
    caption: "Lovely evening walk by the beach.",
    date: "1/26/2024",
    time: "6:22 PM",
  },
  {
    id: 10,
    username: "Rachel",
    avatar: images.av10,
    image: images.img10,
    caption: "Spring flowers in full bloom.",
    date: "4/30/2024",
    time: "1:13 PM",
  },
  {
    id: 11,
    username: "Helene",
    avatar: images.av11,
    image: images.img11,
    caption: "Coffee and a good book to start the day.",
    date: "1/28/2024",
    time: "8:31 AM",
  },
  {
    id: 12,
    username: "Gregoor",
    avatar: images.av12,
    image: images.img12,
    caption: "Nature walk this afternoon.",
    date: "3/19/2024",
    time: "3:39 PM",
  },
  {
    id: 13,
    username: "Elmer",
    avatar: images.av13,
    image: images.img13,
    caption: "Early morning fishing trip!",
    date: "1/27/2024",
    time: "5:02 AM",
  },
  {
    id: 14,
    username: "Aarika",
    avatar: images.av14,
    image: images.img14,
    caption: "Games and its addiction!",
    date: "2/5/2024",
    time: "2:58 AM",
  },
  {
    id: 15,
    username: "Meryl",
    avatar: images.av15,
    image: images.img15,
    caption: "Luffy Gear  is awesome!",
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
const { height, width } = Dimensions.get("window");

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
    marginTop: height * 0.05,
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
