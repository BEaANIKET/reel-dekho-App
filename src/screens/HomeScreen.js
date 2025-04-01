// src/screens/HomeScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import MainLayout from '../MainApp/MainLayout';

const HomeScreen = ({ navigation }) => {
  return (
    <MainLayout navigation={navigation}>
      <View>
        <Text>Welcome to the Home Screen!</Text>
        <Button
          title="Go to FAQ"
          onPress={() => navigation.navigate('FAQ')} // Navigate to FAQ screen
        />
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
