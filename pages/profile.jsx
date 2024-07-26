import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);

  const data = {
    bio: "Lover of nature and technology. Passionate about coding and coffee.",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvFCNx3XOOU9GirFqWfVMedEN_EIzJS-aKg&usqp=CAU", // Placeholder image URL
    posts: [
      {
        id: 1,
        imageUrl:
          "https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-800x525.jpg",
      },
      {
        id: 2,
        imageUrl:
          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/3.jpg",
      },
      {
        id: 3,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLLldsYx7o2X3YmZzDaybBUQ-8LmvBBwBMA&usqp=CAU",
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        setUserData(JSON.parse(userDataString));
      }
    }

    fetchData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: data.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.bio}>{data.bio}</Text>
      </View>
      <View style={styles.posts}>
        <Text style={styles.postsTitle}>Posts</Text>
        {data.posts &&
          data.posts.map((post) => (
            <View key={post.id} style={styles.post}>
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});