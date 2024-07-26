import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const Post = ({ post, isFavorite, toggleFavorite }) => {
  const isLocalImage = typeof post.image !== "string";

  const handleToggleFavorite = () => {
    toggleFavorite(post);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image
          source={isLocalImage ? post.avatar : { uri: post.avatar }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.date}>
            {post.date} at {post.time}
          </Text>
        </View>
      </View>
      <Image
        source={isLocalImage ? post.image : { uri: post.image }}
        style={styles.postImage}
      />
      <Text style={styles.caption}>{post.caption}</Text>
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
      >
        <IconButton
          icon={isFavorite ? "heart" : "heart-outline"}
          iconColor="red"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Post;
