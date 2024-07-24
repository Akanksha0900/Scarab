import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

const SavedMessagesScreen = ({ navigation }) => {
  const savedItems = [
    { id: "1", type: "video", content: "Video 1" },
    { id: "2", type: "post", content: "Post 1" },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.content}</Text>
          </View>
        )}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        color="#FFBF00"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#333",
    padding: 20,
    marginVertical: 8,
    width: "90%",
    borderRadius: 10,
  },
  itemText: {
    color: "#FFF",
  },
});

export default SavedMessagesScreen;
