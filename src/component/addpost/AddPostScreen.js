import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const AddPostScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState(null);
  const [description, setDescription] = useState("");

  // Open Gallery to Select Image/Video
  const selectMedia = () => {
    launchImageLibrary({ mediaType: "mixed" }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setMedia(response.assets[0]);
      }
    });
  };

  // Upload Post
  const handleUpload = async () => {
    if (!title || !category || !description || !media) {
      Alert.alert("Error", "Please fill all fields and select a media file.");
      return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", {
      uri: media.uri,
      type: media.type,
      name: media.fileName || `upload.${media.type.split("/")[1]}`,
    });

    try {
      const response = await fetch("https://your-backend.com/api/posts", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await response.json();
      Alert.alert("Success", "Post uploaded successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to upload post.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />

      <Text>Category</Text>
      <TextInput value={category} onChangeText={setCategory} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />

      <Text>Description</Text>
      <RichEditor
        ref={(r) => (this.richText = r)}
        onChange={setDescription}
        placeholder="Write your description..."
        style={{ borderWidth: 1, height: 150, marginBottom: 10 }}
      />
      <RichToolbar editor={this.richText} />

      <TouchableOpacity onPress={selectMedia} style={{ backgroundColor: "#2196F3", padding: 10, marginBottom: 10 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Select Image/Video</Text>
      </TouchableOpacity>

      {media && (
        <Image source={{ uri: media.uri }} style={{ width: "100%", height: 200, marginBottom: 10 }} resizeMode="cover" />
      )}

      <TouchableOpacity onPress={handleUpload} style={{ backgroundColor: "green", padding: 10 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Upload Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPostScreen;
