import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, 
  Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform 
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";

const AddPost = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const selectFile = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "mixed", includeBase64: false },
      (response) => {
        if (!response.didCancel && response.assets) {
          const selectedFile = response.assets[0];
          setFile(selectedFile);
          setFileName(selectedFile.fileName);
        }
      }
    );
  };

  const uploadData = async () => {
    if (!file || !productName || !description || !caption) {
      Alert.alert("Error", "Please fill all fields and select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.type || "image/jpeg",
      name: file.fileName || "upload.jpg",
    });
    formData.append("fileName", fileName);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("caption", caption);

    try {
      const response = await fetch("https://backendapi.com/api/form", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        Alert.alert("Success", "File uploaded successfully!");
      } else {
        Alert.alert("Error", result.message || "Upload failed");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.uploadBox} onPress={selectFile}>
            {file ? (
              <Image source={{ uri: file.uri }} style={styles.preview} />
            ) : (
              <Text style={styles.uploadText}>Upload Image or Video</Text>
            )}
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>File Name</Text>
            <TextInput style={styles.input} value={fileName} editable={false} />

            <Text style={styles.label}>Product Name</Text>
            <TextInput 
              style={styles.input} 
              value={productName} 
              onChangeText={setProductName} 
              placeholder="Product Name" 
            />

            <Text style={styles.label}>Description</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              value={description} 
              onChangeText={setDescription} 
              placeholder="Description" 
              multiline 
            />

            <Text style={styles.label}>Caption</Text>
            <TextInput 
              style={styles.input} 
              value={caption} 
              onChangeText={setCaption} 
              placeholder="Caption" 
            />
          </View>

          <Button mode="contained" onPress={uploadData} style={styles.button} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : "Upload"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: "#fff", marginBottom: 80 },
  uploadBox: { height: 150, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 20 },
  uploadText: { color: "#777" },
  preview: { width: "100%", height: "100%", borderRadius: 10 },
  inputGroup: { marginBottom: 20 },
  label: { fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  textArea: { height: 80 },
  button: { marginTop: 10 },
});

export default AddPost;
