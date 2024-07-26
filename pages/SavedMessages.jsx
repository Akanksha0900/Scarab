import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";

import { FavoriteContext } from "../Contexts/FavoritesContext";
import CustomTextInput from "../components/CustomTextInput";

const SavedPosts = () => {
  const { state } = useContext(FavoriteContext);
  const { favorites } = state;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Posts</Text>
      <ScrollView>
        {favorites.length > 0 ? (
          favorites.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              {/* <View style={styles.avatar} /> */}
              <Image
                source={
                  typeof post.image !== "string"
                    ? post.image
                    : { uri: post.image }
                }
                style={styles.postImage}
              />
              <View style={styles.postInfo}>
                <Text style={styles.postTitle} numberOfLines={1}>
                  {post.caption}
                </Text>
                <Text style={styles.postAuthor}>Author Name</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}></TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noPostsText}>No saved posts yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0.06 * height,
    marginLeft: 0.08 * width,
    marginBottom: 20,
  },
  searchInput: {
    color: "#fff",
    borderRadius: 5,
    marginBottom: 20,
  },
  postContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  postImage: {
    width: 300,
    height: 250,
    borderRadius: 25,
    marginVertical: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5a623",
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  postAuthor: {
    color: "gray",
    fontSize: 14,
  },
  moreButton: {
    padding: 10,
  },
  noPostsText: {
    color: "gray",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 16,
  },
});

export default SavedPosts;
