import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

const SavedPosts = () => {
  const posts = [
    { id: 1, title: "Post 1", author: "MrBeast" },
    { id: 2, title: "Post 2", author: "SharkTank" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Posts</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search your saved posts"
        placeholderTextColor="#777"
      />
      <ScrollView>
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.avatar} />
            <View style={styles.postInfo}>
              <Text style={styles.postTitle} numberOfLines={1}>
                {post.title}
              </Text>
              <Text style={styles.postAuthor}>{post.author}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5a623",
    marginRight: 10,
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
  moreButtonText: {
    color: "white",
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopColor: "#1e1e1e",
    borderTopWidth: 1,
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