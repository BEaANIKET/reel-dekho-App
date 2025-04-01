// ReelsSection.js
import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, Modal, Linking } from 'react-native';
import Video from 'react-native-video'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { useIsFocused } from '@react-navigation/native'; 
import ShareModal from '../ShareModal';
import { REELS } from '../../data/reelsData'; // Import the data
import CommentModal from './CommentModal';

const { height, width } = Dimensions.get('window'); 

const HEADER_HEIGHT = 75;
const BOTTOM_TAB_HEIGHT = 55;
const VIDEO_HEIGHT = height - HEADER_HEIGHT - BOTTOM_TAB_HEIGHT;

const ReelItem = ({ reel, isVideoVisible }) => {
  const [liked, setLiked] = useState(false);
  const [paused, setPaused] = useState(true); 
  const [saved, setSaved] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const videoRef = useRef(null);
  const isFocused = useIsFocused(); 
  
  const handleShare = () => {
    setShowModal(!showModal)
  };
 const handleCommentModal = () =>{
  setIsModalVisible(true)
 }
  const shareOnWhatsApp = (mediaUrl, phone) => {
    const phoneNumber = phone;
    const message = mediaUrl;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    Linking.openURL(url).catch(() => alert("WhatsApp is not installed"));
  }

  const toggleLike = () => setLiked(!liked);
  const toggleSave = () => setSaved(!saved);

  const onVideoPause = () => setPaused(true);
  const onVideoPlay = () => setPaused(false);

  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isVideoVisible && isFocused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isVideoVisible, isFocused]);

  return (
    <View style={styles.reelContainer}>
      {reel.mediaType === 'video' ? (
        <TouchableOpacity onPress={() => setPaused(!paused)}>
          <Video
            ref={videoRef}
            source={{ uri: reel.mediaUrl }}
            style={styles.media}
            resizeMode="cover"
            repeat
            paused={paused}
            onEnd={() => console.log('Video Ended')}
            onPlay={onVideoPlay}
            onPause={onVideoPause}
          />
        </TouchableOpacity>
      ) : (
        <Image source={{ uri: reel.mediaUrl }} style={styles.media} />
      )}

      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
          <Image source={{ uri: reel.userImage }} style={styles.userImage} />
          <Text style={styles.userName}>{reel.user}</Text>
        </View>
        <Text style={styles.caption}>{reel.caption}</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity onPress={toggleLike} style={styles.actionButton}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={28}
              color="black"
            />
            <Text style={styles.actionText}>{reel.likes + (liked ? 1 : 0)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleCommentModal}>
            <Ionicons name="chatbubble-outline" size={28} color="black" />
            <Text style={styles.actionText}>{reel.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location-outline" size={28} color="black" />
            <Text style={styles.actionText}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={28} color="black" />
            <Text style={styles.actionText}></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSave} style={styles.actionButton}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={28}
              color={saved ? 'white' : 'black'}
            />
            <Text style={styles.actionText}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => shareOnWhatsApp(reel.mediaUrl, reel.phone)}>
            <Ionicons name="logo-whatsapp" size={28} color="black" />
            <Text style={styles.actionText}></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Share Modal */}
      {showModal ? <ShareModal mediaUrl={reel.mediaUrl} onClose={() => setShowModal(false)} /> : null}
      <CommentModal
        isVisible={isModalVisible}
        onClose={toggleModal} // Pass toggleModal as the onClose function
      />
    </View>
  );
};

const ReelsSection = () => {
  const [viewableReels, setViewableReels] = useState({});

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const newViewableReels = {};

    viewableItems.forEach((item) => {
      if (item.item.mediaType === 'video') {
        newViewableReels[item.index] = item.isViewable;
      }
    });

    setViewableReels(newViewableReels);
  });

  return (
    <FlatList
      data={REELS}
      renderItem={({ item, index }) => (
        <ReelItem reel={item} isVideoVisible={viewableReels[index] || false} />
      )}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      windowSize={3}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
    />
  );
};

const styles = StyleSheet.create({
  reelContainer: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
    paddingHorizontal: 10,
    width: '90%',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontWeight: '500',
  },
  caption: {
    color: 'white',
    paddingTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
  },
  actionButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
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

export default ReelsSection;