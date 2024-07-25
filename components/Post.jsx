import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const Post = ({ post }) => {
  const isLocalImage = typeof post.image !== "string";

  return (
    <View style={styles.postContainer}>
      <Image
        source={isLocalImage ? post.image : { uri: post.image }}
        style={styles.postImage}
      />
      <Text style={styles.caption}>{post.caption}</Text>
      <TouchableOpacity>
        <IconButton
          icon={post.isFavorite ? "heart" : "heart-outline"}
          color={post.isFavorite ? "red" : ""}
          size={30}
          onPress={() => {}}
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
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  caption: {
    padding: 10,
    fontSize: 16,
  },
});

export default Post;
