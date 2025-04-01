// src/components/MainLayout.js

import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <Sidebar navigation={navigation} />
        <ScrollView style={styles.content}>{children}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    marginLeft: 220, // Offset for the sidebar
    padding: 20,
  },
});

export default MainLayout;
