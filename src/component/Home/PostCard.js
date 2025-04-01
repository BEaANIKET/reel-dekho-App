import {useCallback, useEffect, useRef, useState} from 'react';
import ShareModal from '../ShareModal';
import CommentModal from './CommentModal';
import {IndentifyFileType} from './MediaList';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../api/axios';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

export const PostCard = ({item, isPaused}) => {
  const [liked, setLiked] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const videoRef = useRef(null);
  const [likeCount, setLikeCount] = useState(0);
  const {isPlaying} = useSelector(state => state.sound);
  const dispatch = useDispatch();

  const fetchLikes = async () => {
    try {
      const response = await api.get(`/post/getlikes?postId=${item._id}`);
      setLiked(response.data.isCurrUserLiked);
      setLikeCount(response.data.likesCount);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchLikes();
  }, []);

  const handleLike = async () => {
    try {
      const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
      setLiked(!liked);
      setLikeCount(newLikeCount);
      const response = await api.post(`/post/like?postId=${item._id}`);
    } catch (error) {
      if (error?.response?.status === 401) {
        console.log('Please login to like');
        return;
      }
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <Image
          source={{uri: item.user.profilePicture}}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.user.fullName}</Text>
        </View>
        <TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
          <Icon name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {optionsVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 20,
            backgroundColor: 'white',
            padding: 10,
            display: 'flex',
            height: 'fit-content',
            flexDirection: 'column',
            gap: 8,
            zIndex: 100,
            borderRadius: 8,
            padding: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              borderBlockColor: 'black',
            }}>
            Report
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Saved
          </Text>
        </View>
      )}

      {/* Media Display (Image or Video) */}

      <View
        style={{
          position: 'relative',
        }}>
        {IndentifyFileType(item?.file?.fileType) === 'image' ? (
          <Image source={{uri: item.file?.url}} style={styles.media} />
        ) : IndentifyFileType(item?.file?.fileType) ? (
          <>
            <Video
              ref={videoRef}
              source={{uri: item.file?.url}}
              style={styles.media}
              paused={isPaused}
              resizeMode="cover"
              repeat={true}
              muted={!isPlaying}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  dispatch({type: isPlaying ? 'sound/paused' : 'sound/play'})
                }>
                <Icon
                  name={isPlaying ? 'volume-high' : 'volume-mute'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.media}>Invalid File Type</Text>
        )}
      </View>

      {/* Interaction Bar */}
      <View style={styles.interactionBar}>
        <TouchableOpacity onPress={() => handleLike()}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? 'red' : '#000'}
            style={styles.iconPadding}
          />
        </TouchableOpacity>
        <Text>{likeCount}</Text>

        <TouchableOpacity onPress={() => setCommentModalVisible(true)}>
          <Icon
            name="chatbubble-outline"
            size={24}
            color="#000"
            style={styles.iconPadding}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShareModalVisible(true)}>
          <Icon
            name="paper-plane-outline"
            size={24}
            color="#000"
            style={styles.iconPadding}
          />
        </TouchableOpacity>

        <View style={styles.rightAlign}>
          <Icon
            name="location-outline"
            size={24}
            color="#000"
            style={styles.iconPadding}
          />
          <Text>2.5 km</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setCommentModalVisible(true)}>
        <Text style={styles.allcomment}>View All Comments</Text>
      </TouchableOpacity>
      <Text style={styles.allcomment}>2 days ago</Text>

      {/* Modals */}
      {commentModalVisible && (
        <CommentModal
          setNewComment={setNewComment}
          commentModalVisible={commentModalVisible}
          setCommentModalVisible={setCommentModalVisible}
          newComment={newComment}
        />
      )}
      {shareModalVisible && (
        <ShareModal
          mediaUrl={'hiiii'}
          shareModalVisible={shareModalVisible}
          setShareModalVisible={setShareModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 3,
    paddingBottom: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileImage: {width: 40, height: 40, borderRadius: 20},
  userInfo: {flex: 1, marginLeft: 10},
  username: {fontWeight: 'bold', fontSize: 14},
  media: {width: '100%', height: 400},
  interactionBar: {flexDirection: 'row', alignItems: 'center', padding: 10},
  iconPadding: {paddingHorizontal: 10},
  rightAlign: {flexDirection: 'row', alignItems: 'center', marginLeft: 'auto'},
  allcomment: {paddingLeft: 12},

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  popover: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  popoverOption: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
