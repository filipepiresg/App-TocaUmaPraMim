import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import translate from '../i18n/src/locales';

import {
  ExploreScreen,
  ProfileScreen,
  EditProfileScreen,
  NewSongScreen
} from "../screens";
import stylesd from '../stylesd';
import ConfigurationScreen from '../screens/ConfigurationScreen';

const TabNavigator = createBottomTabNavigator({ 
  Explore:{
    screen: ExploreScreen,
    navigationOptions:{
      tarBarLabel: translate("explore"),
      tabBarIcon:({ tintColor }) => (
        <Icon name="globe" style={{color:tintColor}} size={24}/>
      )
    }
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions:{
      tabBarLabel: translate("profile"),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" style={{color:tintColor}} size={24}/>
      )
    }
  },
  Configurations:{
    screen: ConfigurationScreen,
    navigationOptions:{
      tabBarLabel: translate("configurations"),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="settings" style={{color:tintColor}} size={24}/>
      )
    }
  }
},{//router cconfig
  initialRouteName: 'Profile',
  order: ['Explore','Profile','Configurations'],
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
    EditProfile: EditProfileScreen,
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
