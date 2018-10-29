import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";

import {
  ExploreScreen,
  ProfileScreen,
  EditProfileScreen,
  NewSongScreen,
  UserScreen
} from "../screens";
import stylesd from '../stylesd';
import ConfigurationScreen from '../screens/ConfigurationScreen';

const ACTIVE_COLOR = '#fff'
const INACTIVE_COLOR = stylesd.corDeFundo

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
  },
  Configurations:{
    screen: ConfigurationScreen,
    navigationOptions:{
      tabBarLabel: 'Configurations',
      tabBarIcon: ({ tintColor }) => (
        <Icon active name="settings" style={{color:tintColor}} size={24}/>
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
    activeTintColor: ACTIVE_COLOR,
    inactiveTintColor: INACTIVE_COLOR,
    style: {
      backgroundColor: stylesd.segundaCor
    }
  }
  
});

export default createStackNavigator({
    TabNavigator:{
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    EditProfile: EditProfileScreen,
    NewSong: NewSongScreen,
    UserProfile: UserScreen,
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
