import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import ReelsSection from './reels/ReelsSection';
import SearchGrid from './search/SearchGrid';
import SearchBar from './search/SearchBar';
import Faq from './hamsburger/Faq';
import Chat from './Home/Chat';
import MediaList from './Home/MediaList';
import AddPost from './AddPost.js/AddPost';
import Profile from './Profile/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../redux/slices/authSlices';
import {LoginScreen, SignupScreen} from '../screens/AuthScreen';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        const icons = {
          Home: 'home',
          Search: 'search',
          Reels: 'film',
          AddPost: 'add-circle',
          Profile: 'person',
        };
        return <Icon name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6200ea',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarStyle: {backgroundColor: '#fff', height: 60, paddingBottom: 5},
    })}>
    <Tabs.Screen name="Home" component={MediaList} />
    <Tabs.Screen name="Search" component={SearchBar} />
    <Tabs.Screen name="Reels" component={ReelsSection} />
    <Tabs.Screen name="AddPost" component={AddPost} />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{
            header: props => <Header {...props} />,
          }}
        />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="Saved" component={SearchGrid} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Sidebar;
