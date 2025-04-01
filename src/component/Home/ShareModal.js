import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, Linking, Clipboard } from 'react-native';

const { width } = Dimensions.get('window');

const ShareModal = ({ mediaUrl, setShareModalVisible, shareModalVisible}) => {
  const shareOnWhatsApp = () => {
    const url = `whatsapp://send?text=${mediaUrl}`;
    Linking.openURL(url).catch(() => alert("WhatsApp is not installed"));
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${mediaUrl}`;
    Linking.openURL(url).catch(() => alert("Unable to open Facebook"));
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${mediaUrl}`;
    Linking.openURL(url).catch(() => alert("Unable to open Twitter"));
  };

  const copyLink = () => {
    Clipboard.setString(mediaUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <Modal
      visible={shareModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setShareModalVisible(false);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={copyLink} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareOnWhatsApp} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Share on WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareOnFacebook} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Share on Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareOnTwitter} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Share on Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setShareModalVisible(false);
          }} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShareModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: width - 40,
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'black',
  },
});
