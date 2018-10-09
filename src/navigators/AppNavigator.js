import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";

import {
  ExploreScreen,
  ProfileScreen,
  NewSongScreen
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
    NewSong: NewSongScreen

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
