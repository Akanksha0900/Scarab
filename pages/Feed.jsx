import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../components/CustomTextInput";
import { IconButton } from "react-native-paper";
import { FavoriteContext } from "../Contexts/FavoritesContext";
import Post from "../components/Post";
import StoryBar from "../components/StoryBar";

const images = {
  people: require("../assets/images/people.jpeg"),
  robo: require("../assets/images/robo.jpeg"),
};

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
  {
    id: 2,
    username: "Brook",
    avatar: "http://dummyimage.com/203x100.png/dddddd/000000",
    image: "http://dummyimage.com/236x100.png/dddddd/000000",
    caption: "My cat loves this spot by the window.",
    date: "7/8/2024",
    time: "2:56 AM",
  },
  {
    id: 3,
    username: "Heywood",
    avatar: "http://dummyimage.com/250x100.png/5fa2dd/ffffff",
    image: "http://dummyimage.com/168x100.png/ff4444/ffffff",
    caption: "Morning run through the forest.",
    date: "10/7/2023",
    time: "7:39 AM",
  },
  {
    id: 4,
    username: "Ashlen",
    avatar: "http://dummyimage.com/197x100.png/dddddd/000000",
    image: "http://dummyimage.com/163x100.png/dddddd/000000",
    caption: "Strolling through the park this afternoon.",
    date: "9/30/2023",
    time: "3:37 PM",
  },
  {
    id: 5,
    username: "Ossie",
    avatar: "http://dummyimage.com/130x100.png/cc0000/ffffff",
    image: "http://dummyimage.com/113x100.png/ff4444/ffffff",
    caption: "Night owl thoughts.",
    date: "11/1/2023",
    time: "2:58 AM",
  },
  {
    id: 6,
    username: "Alma",
    avatar: "http://dummyimage.com/213x100.png/5fa2dd/ffffff",
    image: "http://dummyimage.com/178x100.png/cc0000/ffffff",
    caption: "Found a rare bird during my morning hike!",
    date: "11/23/2023",
    time: "7:55 AM",
  },
  {
    id: 7,
    username: "Herby",
    avatar: "http://dummyimage.com/125x100.png/ff4444/ffffff",
    image: "http://dummyimage.com/202x100.png/ff4444/ffffff",
    caption: "Winter wonderland is here!",
    date: "12/21/2023",
    time: "7:40 AM",
  },
  {
    id: 8,
    username: "Raeann",
    avatar: "http://dummyimage.com/157x100.png/dddddd/000000",
    image: "http://dummyimage.com/230x100.png/cc0000/ffffff",
    caption: "Catching up on my favorite sci-fi series.",
    date: "1/13/2024",
    time: "3:32 PM",
  },
  {
    id: 9,
    username: "Mariska",
    avatar: "http://dummyimage.com/222x100.png/cc0000/ffffff",
    image: "http://dummyimage.com/192x100.png/5fa2dd/ffffff",
    caption: "Lovely evening walk by the beach.",
    date: "1/26/2024",
    time: "6:22 PM",
  },
  {
    id: 10,
    username: "Rachel",
    avatar: "http://dummyimage.com/118x100.png/ff4444/ffffff",
    image: "http://dummyimage.com/112x100.png/cc0000/ffffff",
    caption: "Spring flowers in full bloom.",
    date: "4/30/2024",
    time: "1:13 PM",
  },
  {
    id: 11,
    username: "Helene",
    avatar: "http://dummyimage.com/231x100.png/ff4444/ffffff",
    image: "http://dummyimage.com/190x100.png/cc0000/ffffff",
    caption: "Coffee and a good book to start the day.",
    date: "1/28/2024",
    time: "8:31 AM",
  },
  {
    id: 12,
    username: "Gregoor",
    avatar: "http://dummyimage.com/112x100.png/dddddd/000000",
    image: "http://dummyimage.com/167x100.png/5fa2dd/ffffff",
    caption: "Nature walk this afternoon.",
    date: "3/19/2024",
    time: "3:39 PM",
  },
  {
    id: 13,
    username: "Elmer",
    avatar: "http://dummyimage.com/192x100.png/cc0000/ffffff",
    image: "http://dummyimage.com/129x100.png/dddddd/000000",
    caption: "Early morning fishing trip!",
    date: "1/27/2024",
    time: "5:02 AM",
  },
  {
    id: 14,
    username: "Aarika",
    avatar: "http://dummyimage.com/233x100.png/dddddd/000000",
    image: "http://dummyimage.com/223x100.png/5fa2dd/ffffff",
    caption: "Excited for the sci-fi movie marathon tonight!",
    date: "2/5/2024",
    time: "2:58 AM",
  },
  {
    id: 15,
    username: "Meryl",
    avatar: "http://dummyimage.com/163x100.png/dddddd/000000",
    image: "http://dummyimage.com/206x100.png/5fa2dd/ffffff",
    caption: "Luffy Gear  is awesome!",
    date: "11/17/2023",
    time: "8:21 AM",
  },
];

export default function Feed({ navigation }) {
  const { state, dispatch } = useContext(FavoriteContext);
  const { favorites } = state;

  const toggleFavorite = (post) => {
    if (favorites.some((item) => item.id === post.id)) {
      dispatch({ type: "REMOVE_FROM_FAVORITE", payload: post.id });
    } else {
      dispatch({ type: "ADD_TO_FAVORITE", payload: post });
    }
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : {};
      setUserName(userData.username);
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
          <Post
            key={post.id}
            post={post}
            isFavorite={favorites.some((item) => item.id === post.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// Extract screen dimensions
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
    marginBottom: 4,
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
