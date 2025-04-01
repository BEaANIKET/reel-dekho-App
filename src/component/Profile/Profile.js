import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import api from '../../api/axios';
const Profile = ({navigation}) => {
  const [video, setVideo] = useState(false);
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [posts, setPosts] = useState([]);

  const {user} = useSelector(state => state.auth);

  if (!user) {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
    navigation.navigate('Login');
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPaused(true);
        videoRef.current?.seek(0);
        // videoRef.current?.pause();
      };
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      // Play the video when the profile screen is focused
      setPaused(false);
      videoRef.current?.seek(0);
      // videoRef.current?.play();
    }, []),
  );

  const fetchPosts = useCallback(async () => {
    try {
      const response = await api.get('/post/get');
      console.log(response.data);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error.message);
    }
  });

  useEffect(() => {
    fetchPosts();
  });

  // console.log(posts);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: user.profilePicture,
            }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.nameAndIcons}>
            <Text style={styles.userName}>{user.fullName}</Text>
            <View style={styles.iconContainer}>
              <Feather name="message-circle" size={24} color="gray" />
              <Icon name="whatsapp" size={24} color="green" />
              <MaterialIcons name="location-pin" size={24} color="blue" />
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}> 0 </Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.occupation}>{user?.occupations}</Text>
            <Text style={styles.website}>{user?.website}</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Video Section */}
      <View style={styles.videoCard}>
        {video ? (
          <Text style={styles.videoPlaceholder}>Video Playing...</Text>
        ) : (
          <Video
            ref={videoRef}
            source={{
              uri: user?.smallvideo,
            }}
            style={styles.media}
            resizeMode="cover"
            paused={paused}
            repeat={true}
          />
        )}
      </View>

      {/* Posts Section */}
      <View>
        <Text
          style={{
            marginTop: '20',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Posts
        </Text>

        <View
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 5,
            marginTop: 10,
            marginBottom: 10,
          }}>
          {posts.map(post => (
            <Image
              key={post._id}
              source={{uri: post.media}}
              style={{width: '100%', height: 200, borderRadius: 8}}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  profileSection: {flexDirection: 'row', alignItems: 'center', gap: 16},
  profilePictureContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilePicture: {width: '100%', height: '100%'},
  userInfo: {flex: 1},
  nameAndIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {fontSize: 20, fontWeight: 'bold', color: '#333'},
  iconContainer: {flexDirection: 'row', gap: 10},
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {alignItems: 'center'},
  statNumber: {fontSize: 16, fontWeight: 'bold'},
  statLabel: {fontSize: 12, color: 'gray'},
  bioContainer: {
    backgroundColor: '#E5E7EB',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  occupation: {fontSize: 14, fontWeight: 'bold', color: '#333'},
  website: {fontSize: 12, color: '#555'},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {fontSize: 16, fontWeight: 'bold'},
  videoCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  videoPlaceholder: {fontSize: 16, color: 'gray'},
  media: {width: '100vw', height: 200, alignSelf: 'stretch'},
});

export default Profile;
