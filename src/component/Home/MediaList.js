import React, {useState, useRef, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api/axios';
import {addPost} from '../../redux/slices/feedSlices';
import SkeletonPostCard from '../skeleton/postSkeloton';
import {PostCard} from './PostCard';

export const IndentifyFileType = fileType => {
  const arr = [
    'mp4',
    'mkv',
    'avi',
    'webm',
    'mov',
    'flv',
    'wmv',
    '3gp',
    'ogg',
    'ogv',
    'm4v',
    'mpg',
    'mpeg',
    'm2v',
    'm4v',
    '3gp2',
    '3g2',
    '3gpp',
    '3gp',
  ];

  if (arr.includes(fileType)) {
    return 'video';
  } else if (fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg') {
    return 'image';
  } else {
    return null;
  }
};

export default () => {
  const [viewableItems, setViewableItems] = useState([]);
  const {posts: mediaData, loading} = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const [isMore, setIsMore] = useState(true);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    setViewableItems(viewableItems.map(({item}) => item._id));
  }, []);

  // Fetch posts function
  const fetchMediaPosts = async () => {
    try {
      const response = await api.get('/post/get');
      dispatch(addPost(response.data.posts));
      dispatch({type: 'feed/setLoading', payload: false});
    } catch (error) {
      dispatch({type: 'feed/setError', payload: error.message});
      dispatch({type: 'feed/setLoading', payload: false});
    }
  };

  const loadMorePosts = async () => {
    if (!isMore) return;

    try {
      const excludeIds = mediaData.map(post => post._id).join(',');
      const response = await api.get(`/post/get?excludeIds=${excludeIds}`);
      dispatch({type: 'feed/addLoadMorePost', payload: response.data.posts});
      setIsMore(response?.data?.posts?.length > 0);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!mediaData || mediaData.length === 0) {
      fetchMediaPosts();
    }
  }, [mediaData]);

  // Render skeleton loaders while loading
  if (loading) {
    return (
      <FlatList
        data={Array(5).fill(0)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <SkeletonPostCard />}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <FlatList
      data={mediaData}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <PostCard item={item} isPaused={!viewableItems.includes(item._id)} />
      )}
      onViewableItemsChanged={onViewableItemsChanged} // Directly passing it
      viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}} // Define it here
      showsVerticalScrollIndicator={false}
      onEndReached={loadMorePosts}
    />
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
