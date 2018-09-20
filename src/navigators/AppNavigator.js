import { createBottomTabNavigator } from "react-navigation";
import { ExploreScreen, ProfileScreen } from "../screens";
import { Icon } from "native-base";
import React from 'react';

export default createBottomTabNavigator({ 
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
      backgroundColor: 'rgb(72,186,196)'
    }
  }
  
});
