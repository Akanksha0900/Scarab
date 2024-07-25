import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const stories = [
  { id: 1, image: require("../assets/images/img5.jpg"), name: "Alice" },
  { id: 2, image: require("../assets/images/img6.jpg"), name: "Bob" },
  { id: 3, image: require("../assets/images/img7.jpg"), name: "Charlie" },
  { id: 4, image: require("../assets/images/img5.jpg"), name: "Alice" },
  { id: 5, image: require("../assets/images/img6.jpg"), name: "Bob" },
  { id: 6, image: require("../assets/images/img7.jpg"), name: "Charlie" },
  { id: 7, image: require("../assets/images/img5.jpg"), name: "Alice" },
  { id: 8, image: require("../assets/images/img6.jpg"), name: "Bob" },
  { id: 9, image: require("../assets/images/img7.jpg"), name: "Charlie" },
];

const StoryBar = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {stories.map((story) => (
        <View key={story.id} style={styles.storyContainer}>
          <Image source={story.image} style={styles.storyImage} />
          <Text style={styles.storyName}>{story.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 140,
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 10,
    height: 100,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
  },
  storyName: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
});

export default StoryBar;
