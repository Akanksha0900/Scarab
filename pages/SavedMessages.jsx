import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const SavedVideos = () => {
  const videos = [
    { id: 1, title:"Video 1",author:"MrBeast"},
    { id: 1, title:"Video2",author:"SharkTank"},
    
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Videos</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search your saved videos"
        placeholderTextColor="#777"
      />
      <ScrollView>
        {videos.map((video) => (
          <View key={video.id} style={styles.videoContainer}>
            <View style={styles.avatar} />
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={1}>{video.title}</Text>
              <Text style={styles.videoAuthor}>{video.author}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5a623',
    marginRight: 10,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoAuthor: {
    color: 'gray',
    fontSize: 14,
  },
  moreButton: {
    padding: 10,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopColor: '#1e1e1e',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SavedVideos;