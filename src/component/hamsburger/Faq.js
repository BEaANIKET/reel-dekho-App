import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data
  const dummyFaqData = [
    {
      Title: "How do I use the service?",
      About: "To use the service, sign up on our website, fill in your details, and you'll be able to access all our services.",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      Title: "How can I contact support?",
      About: "You can contact our support team via the 'Contact Us' page or by sending an email to support@company.com.",
      createdAt: "2024-02-01T00:00:00Z",
    },
    {
      Title: "What are the payment options?",
      About: "We accept credit cards, PayPal, and bank transfers. You can choose your preferred method during checkout.",
      createdAt: "2024-03-01T00:00:00Z",
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    setFaqData(dummyFaqData);  // Simulating fetching data
    setLoading(false);
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // If loading, show loading message
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={faqData}
      renderItem={({ item, index }) => (
        <View style={styles.faqItem}>
          <TouchableOpacity
            style={styles.faqButton}
            onPress={() => toggleAnswer(index)}
          >
            <View style={styles.faqTitleContainer}>
              <Ionicons name="help-circle-outline" size={24} color="#3b82f6" />
              <Text style={styles.faqTitle}>{item.Title}</Text>
            </View>
            <Ionicons
              name={activeIndex === index ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>

          {activeIndex === index && (
            <View style={styles.faqAnswer}>
              <Text style={styles.faqAnswerText}>{item.About}</Text>
              <Text style={styles.faqDate}>
                Published on {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Frequently Asked Questions</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#6b7280",
  },
  faqItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  faqButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f1f5f9", // Add a background to give feedback
    borderRadius: 8, // Rounded corners for the button
  },
  faqTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
  },
  faqAnswerText: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 8,
  },
  faqDate: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default Faq;
