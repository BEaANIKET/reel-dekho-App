import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
// import { Button } from 'react-native-paper';   

const Sidebar = () => {
  const Navigation = createNativeStackNavigator();
  // const route = useRoute();
 const btnAction = () =>{
  console.warn('hiii')
 }
  return (
    <NavigationContainer>
    <Navigation.Navigator 
    screenOptions={{
      headerStyle:{
      backgroundColor:'green',      
    },
    headerTitleStyle:{
      fontSize:10
    },
    headerTintColor: 'orange',
    }}
    >
      <Navigation.Screen name='Home' component={Home} />
      <Navigation.Screen name='Search' component={Search} options={{
        headerTitle:()=><Button onPress={btnAction} title='left' />,
        headerRight:()=> <Headcompo />
      }}/>
    </Navigation.Navigator>

    </NavigationContainer>
    // <View style={styles.sidebar}>
    //   <Image source={{ uri: 'https://socket.reeldekho.com/public/Images/c4caab4b9e487b7afe9b38e894ee7ea8' }} style={styles.logo} />
      
    //   <NavItem to="Home" icon="home" label="Home" active={route.name === 'Home'} />
    //   <NavItem to="Search" icon="search" label="Search" />
    //   <NavItem to="Reels" icon="film" label="Reels" active={route.name === 'Reels'} />
    //   <NavItem to="AddProduct" icon="plus-square" label="Create" />
    //   <NavItem to="Profile" icon="user" label="Profile" />
    // </View>
  );
};

// const NavItem = ({ to, icon, label, active }) => {
//   const navigation = useNavigation();
//   return (
//     <TouchableOpacity
//       onPress={() => navigation.navigate(to)}
//       style={[styles.navItem, active && styles.activeNavItem]}
//     >
//       <Icon name={icon} size={24} color={active ? '#000' : '#808080'} />
//       <Text style={[styles.navText, active && styles.activeNavText]}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   sidebar: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     height: '100%',
//     width: 80,
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 20,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginBottom: 20,
//   },
//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   activeNavItem: {
//     backgroundColor: '#e0e0e0',
//   },
//   navText: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#808080',
//   },
//   activeNavText: {
//     color: '#000',
//   },
// });

const Home = (props) =>{
  return(
    <View>
      <Text>
        hloo
      </Text>
      <Button title= 'Search' onPress={()=> props.navigation.navigate("Search")} />
    </View>
  )
}

const Search = () =>{
  return(
    <View>
      <Text>
        Search
      </Text>
    </View>
  )
}
const Headcompo = () =>{
  return(
    <TextInput placeholder='hello' />
  )
}
export default Sidebar;
