import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const slideAnimLeft = useRef(new Animated.Value(-250)).current;
  const slideAnimRight = useRef(new Animated.Value(250)).current;

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(slideAnimLeft, {
        toValue: -250,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(slideAnimLeft, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleNotifications = () => {
    if (isNotificationOpen) {
      Animated.timing(slideAnimRight, {
        toValue: 250,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setIsNotificationOpen(false));
    } else {
      setIsNotificationOpen(true);
      Animated.timing(slideAnimRight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 4,
      }}
    >
      {/* Hamburger Menu */}
      <Pressable onPress={toggleMenu}>
        <Icon name="bars" size={24} color="black" />
      </Pressable>

      {/* Logo */}
      <Image
        source={{
          uri: "https://socket.reeldekho.com/public/Images/c4caab4b9e487b7afe9b38e894ee7ea8",
        }}
        style={{ height: 40, width: 100, resizeMode: "contain" }}
      />

      {/* Icons */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Pressable onPress={toggleNotifications}>
          <AntDesign name="bells" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Chat")}>
          <MaterialCommunityIcons name="chat" size={24} color="black" />
        </Pressable>
      </View>

      {/* Sidebar Menu (Left) */}
      <Modal visible={isMenuOpen} animationType="none" transparent>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Animated.View
              style={{
                position: "absolute",
                transform: [{ translateX: slideAnimLeft }],
                top: 0,
                bottom: 0,
                width: 250,
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <Pressable onPress={toggleMenu} style={{ alignSelf: "flex-end" }}>
                <Icon name="times" size={24} color="black" />
              </Pressable>

              <ScrollView>
                {[
                  { name: "Home", icon: "home" },
                  { name: "Change Password", icon: "key" },
                  { name: "Logout", icon: "sign-out" },
                  { name: "Saved", icon: "bookmark", action: () => navigation.navigate("Saved") },
                  { name: "FAQ", icon: "question-circle", action: () => navigation.navigate("Faq") },
                  { name: "Delete Account", icon: "trash" },
                ].map((item, index) => (
                  <Pressable key={index} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }} onPress={item.action}>
                    <Icon name={item.icon} size={20} color="black" style={{ marginRight: 10 }} />
                    <Text>{item.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal visible={isNotificationOpen} animationType="none" transparent>
              <TouchableWithoutFeedback onPress={toggleNotifications}>
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  {/* Animated Notification Sidebar */}
                  <Animated.View
                    style={{
                      position: "absolute",
                      transform: [{ translateX: slideAnimRight }],
                      top: 0,
                      bottom: 0,
                      right: 0,
                      width: 250,
                      backgroundColor: "white",
                      padding: 20,
                    }}
                  >
                    {/* Close Button */}
                    <Pressable onPress={toggleNotifications} style={{ alignSelf: "flex-end" }}>
                      <Icon name="times" size={24} color="black" />
                    </Pressable>
      
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                      Notifications
                    </Text>
      
                    <ScrollView>
                      {["You have a new message", "Your order is being processed", "Your profile was viewed", "Reminder: Update your password", "New friend request received"].map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="bell"
                            size={20}
                            color="black"
                            style={{ marginRight: 10 }}
                          />
                          <Text>{item}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
    </View>
  );
};

export default Header;
