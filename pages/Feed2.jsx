import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

const Create = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
    scheduleDate: null,
    scheduleTime: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({
        ...form,
        image: result.assets[0],
      });
    }
  };

  const submit = async () => {
    if (form.title === "" || !form.image) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);

    try {
      const posts = JSON.parse(await AsyncStorage.getItem("posts")) || [];
      posts.unshift({
        id: Date.now().toString(),
        title: form.title,
        image: form.image.uri,
        scheduleDate: form.scheduleDate
          ? form.scheduleDate.toISOString()
          : null,
        scheduleTime: form.scheduleTime
          ? form.scheduleTime.toISOString()
          : null,
      });

      await AsyncStorage.setItem("posts", JSON.stringify(posts));
      Alert.alert("Success", "Post uploaded successfully");

      // Clear the form
      setForm({
        title: "",
        image: null,
        scheduleDate: null,
        scheduleTime: null,
      });

      // Navigate back to feed
      navigation.navigate("Feed");
    } catch (error) {
      Alert.alert("Error", "There was an error uploading the post");
    } finally {
      setUploading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setForm({ ...form, scheduleDate: selectedDate });
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    setForm({ ...form, scheduleTime: selectedTime });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>Upload Image</Text>
        <View style={styles.formField}>
          <CustomTextInput
            title="Caption"
            placeholder="Give your image a catchy caption..."
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
          />
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload Image</Text>
          <TouchableOpacity onPress={openPicker}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                style={styles.uploadedImage}
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <View style={styles.uploadIconContainer}>
                  <Image
                    source={require("../assets/icons/upload.png")}
                    resizeMode="contain"
                    style={styles.uploadIcon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: "row", margin: 15 }}>
          <Text style={{ color: "white", fontSize: 17, marginRight: 5 }}>
            Don't want to upload now?
          </Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: "#FF9C01", fontSize: 17 }}>
              Schedule Post
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={form.scheduleDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {form.scheduleDate && (
          <View style={{ flex: 1, flexDirection: "row", margin: 15 }}>
            <Text style={{ color: "white", fontSize: 17, marginRight: 5 }}>
              Set Time for Scheduled Post
            </Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={{ color: "#FF9C01", fontSize: 17 }}>Set Time</Text>
            </TouchableOpacity>
          </View>
        )}

        {showTimePicker && (
          <DateTimePicker
            value={form.scheduleTime || new Date()}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <CustomButton
          title="Submit & Publish"
          onPress={submit}
          loading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  scrollView: {
    padding: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  uploadSection: {
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },
  uploadPlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  uploadIconContainer: {
    backgroundColor: "#444",
    padding: 20,
    borderRadius: 10,
  },
  uploadIcon: {
    width: 50,
    height: 50,
  },
  uploadedImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default Create;
