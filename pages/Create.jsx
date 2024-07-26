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

const Create = () => {
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
      setForm((prevForm) => ({
        ...prevForm,
        image: result.assets[0],
      }));
    }
  };

  const submit = async () => {
    if (form.title === "" || !form.image) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);

    try {
      const posts = JSON.parse(await AsyncStorage.getItem("posts")) || [];
      const newPost = {
        id: Date.now().toString(),
        title: form.title,
        image: form.image.uri,
        scheduleDate: form.scheduleDate
          ? form.scheduleDate.toISOString()
          : null,
        scheduleTime: form.scheduleTime
          ? form.scheduleTime.toISOString()
          : null,
      };
      posts.push(newPost);

      await AsyncStorage.setItem("posts", JSON.stringify(posts));
      Alert.alert("Success", "Post uploaded successfully");

      // Clear the form
      setForm({
        title: "",
        image: null,
        scheduleDate: null,
        scheduleTime: null,
      });

      // Optimistic UI update can be handled here
      // Update the state in your feed/profile components to reflect the new post
    } catch (error) {
      Alert.alert("Error", "There was an error uploading the post");
    } finally {
      setUploading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setForm((prevForm) => ({ ...prevForm, scheduleDate: selectedDate }));
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    setForm((prevForm) => ({ ...prevForm, scheduleTime: selectedTime }));
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
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, title: text }))
            }
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
          handlePress={submit}
          disabled={uploading}
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
    paddingHorizontal: 16,
    marginTop: 24,
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
  formField: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    color: "#F9E7E7",
    marginBottom: 15,
  },
  uploadSection: {
    marginTop: 20,
  },
  uploadedImage: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  },
  uploadPlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#333333",
    borderRadius: 16,
    borderColor: "#444444",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderColor: "#FF8C00",
    borderWidth: 2,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    width: 28,
    height: 28,
  },
});

export default Create;
