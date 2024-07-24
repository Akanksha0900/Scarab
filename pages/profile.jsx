import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";

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

  function handleEditProfile() {
    // Navigate to Edit Profile screen
    navigation.navigate("EditProfile");
  }

  function handleViewPosts() {
    // Navigate to View Posts screen
    navigation.navigate("Posts", { posts: userData.posts });
  }

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
      <View style={styles.buttons}>
        <CustomButton
          title="Edit Profile"
          handlePress={handleEditProfile}
          style={styles.button}
        />
        <CustomButton
          title="View Posts"
          handlePress={handleViewPosts}
          style={styles.button}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    width: 150,
  },
  posts: {
    paddingHorizontal: 20,
  },
  postsTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  post: {
    backgroundColor: "#282828",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: "white",
  },
});
