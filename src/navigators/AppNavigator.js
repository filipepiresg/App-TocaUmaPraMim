import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";

import {
  ExploreScreen,
  ProfileScreen,
<<<<<<< HEAD
  MusicRegistrationScreen,
  EditProfileScreen
=======
  NewSongScreen
>>>>>>> 5b429d9e1a085c1da2e4c47548572199abe2f83c
} from "../screens";
import stylesd from '../stylesd';

const TabNavigator = createBottomTabNavigator({ 
  Explore:{
    screen: ExploreScreen,
    navigationOptions:{
      tarBarLabel: 'Explore',
      tabBarIcon:({ tintColor }) => (
        <Icon name="globe" style={{color:tintColor}} size={24}/>
      )
    }
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions:{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" style={{color:tintColor}} size={24}/>
      )
    }
  }
},{//router cconfig
  initialRouteName: 'Profile',
  order: ['Explore','Profile'],
  navigationOptions:{
    tabBarVisible: true
  },
  tabBarOptions:{
    activeTintColor: "#FFF",
    inactiveTintColor: "#CCC",
    style: {
      backgroundColor: stylesd.segundaCor
    }
  }
  
});

export default createStackNavigator({
    TabNavigator,
<<<<<<< HEAD
    MusicRegistration: MusicRegistrationScreen,
    EditProfile: EditProfileScreen
=======
    NewSong: NewSongScreen

>>>>>>> 5b429d9e1a085c1da2e4c47548572199abe2f83c
  }, {
    headerMode: 'float',
    initialRouteKey: 'TabNavigator',
    navigationOptions: {
      headerStyle: {
        backgroundColor: stylesd.corDeFundo,
        borderBottomColor: 'transparent'
      }
    }
  }
)
