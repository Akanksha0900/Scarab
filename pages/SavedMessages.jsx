import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";
import { FavoriteContext } from "../Contexts/FavoritesContext";

const SavedPosts = () => {
  const { state, dispatch } = useContext(FavoriteContext);
  const { favorites } = state;

  const toggleFavorite = (post) => {
    if (favorites.some((item) => item.id === post.id)) {
      dispatch({ type: "REMOVE_FROM_FAVORITE", payload: post.id });
    } else {
      dispatch({ type: "ADD_TO_FAVORITE", payload: post });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Posts</Text>
      <ScrollView>
        {favorites.length > 0 ? (
          favorites.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <View style={styles.header}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View style={styles.headerText}>
                  <Text style={styles.username}>{post.username}</Text>
                  <Text style={styles.date}>
                    {post.date} at {post.time}
                  </Text>
                </View>
              </View>
              <Image
                source={
                  typeof post.image !== "string"
                    ? post.image
                    : { uri: post.image }
                }
                style={styles.postImage}
              />
              <Text style={styles.caption}>{post.caption}</Text>
              <TouchableOpacity
                onPress={() => toggleFavorite(post)}
                style={styles.favoriteButton}
              >
                <IconButton
                  icon={
                    favorites.some((item) => item.id === post.id)
                      ? "heart"
                      : "heart-outline"
                  }
                  iconColor="red"
                  size={30}
                />
              </TouchableOpacity>
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
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  caption: {
    padding: 10,
    fontSize: 16,
  },
  favoriteButton: {
    alignSelf: "flex-start",
  },
  noPostsText: {
    color: "gray",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SavedPosts;