import React, { useState } from "react";
import { View, TextInput, StyleSheet, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SearchGrid from "./SearchGrid";

const posts = [
  { id: "1", city: "delhi", title: "Delhi Street Food", image: "https://via.placeholder.com/150" },
  { id: "2", city: "mumbai", title: "Mumbai Beaches", image: "https://via.placeholder.com/150" },
  { id: "3", city: "ranchi", title: "Ranchi Waterfalls", image: "https://via.placeholder.com/150" },
  { id: "4", city: "kolkata", title: "Kolkata Durga Puja", image: "https://via.placeholder.com/150" },
  { id: "5", city: "pune", title: "Pune IT Hub", image: "https://via.placeholder.com/150" },
  { id: "6", city: "jaipur", title: "Jaipur Fort", image: "https://via.placeholder.com/150" },
];

const users = [
  { id: "1", name: "John Doe", city: "delhi", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Jane Smith", city: "mumbai", image: "https://via.placeholder.com/150" },
  { id: "3", name: "Michael Brown", city: "ranchi", image: "https://via.placeholder.com/150" },
  { id: "4", name: "Emily Johnson", city: "kolkata", image: "https://via.placeholder.com/150" },
  { id: "5", name: "Chris Evans", city: "pune", image: "https://via.placeholder.com/150" },
  { id: "6", name: "Sophia Wilson", city: "jaipur", image: "https://via.placeholder.com/150" },
];

const SearchBar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("posts"); // 'posts' or 'users'

  return (
    
    <>
    <View style={styles.container}>
      {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        {/* City Selector */}
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Select City" value="" />
          <Picker.Item label="Delhi" value="delhi" />
          <Picker.Item label="Mumbai" value="mumbai" />
          <Picker.Item label="Ranchi" value="ranchi" />
          <Picker.Item label="Kolkata" value="kolkata" />
          <Picker.Item label="Pune" value="pune" />
          <Picker.Item label="Jaipur" value="jaipur" />
        </Picker>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${searchType}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Toggle Buttons for User & Post Search */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, searchType === "posts" && styles.activeButton]}
          onPress={() => setSearchType("posts")}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, searchType === "users" && styles.activeButton]}
          onPress={() => setSearchType("users")}
        >
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>
      </View>
    </View>
    <SearchGrid />
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  searchInput: {
    flex: 2,
    height: 40,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#777",
  },
});
