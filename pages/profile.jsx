import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

export default function Profile({ navigation }) {
  // Dummy data for the profile
  const userData = {
    username: "Akanksha",
    email: "akankshapandey0900@example.com",
    bio: "Lover of nature and technology. Passionate about coding and coffee.",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvFCNx3XOOU9GirFqWfVMedEN_EIzJS-aKg&usqp=CAU", // Placeholder image URL
    posts: [
      { id: 1, content: "Had a great day at the park!" },
      { id: 2, content: "Started a new React Native project." },
      { id: 3, content: "Enjoying a nice cup of coffee." },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.bio}>{userData.bio}</Text>
      </View>
      <View style={styles.posts}>
        <Text style={styles.postsTitle}>Posts</Text>
        {userData.posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Text style={styles.postContent}>{post.content}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    marginTop: 0.06 * height,
  },
  username: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: "#bbb",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  posts: {
    paddingHorizontal: 10,
  },
  postsTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  post: {
    backgroundColor: "#282828",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  postContent: {
    fontSize: 16,
    color: "white",
  },
});
