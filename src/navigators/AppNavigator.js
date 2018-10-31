import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import translate from '../i18n/src/locales';

import {
  ExploreScreen,
  ProfileScreen,
  EditProfileScreen,
  NewSongScreen,
  ArtistScreen,
  ConfigurationScreen
} from "../screens";
import stylesd from '../stylesd';

const ACTIVE_COLOR = '#fff'
const INACTIVE_COLOR = stylesd.corDeFundo

// const TabNavigator = createBottomTabNavigator({ 
//   Explore:{
//     screen: ExploreScreen,
//     navigationOptions:{
//       tarBarLabel: translate("explore"),
//       tabBarIcon:({ tintColor }) => (
//         <Icon name="globe" style={{color:tintColor}} size={24}/>
//       )
//     }
//   },
//   Profile:{
//     screen: ProfileScreen,
//     navigationOptions:{
//       tabBarLabel: translate("profile"),
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-person" style={{color:tintColor}} size={24}/>
//       )
//     }
//   },
//   Configurations:{
//     screen: ConfigurationScreen,
//     navigationOptions:{
//       tabBarLabel: translate("configurations"),
//       tabBarIcon: ({ tintColor }) => (
//         <Icon active name="settings" style={{color:tintColor}} size={24}/>
//       )
//     }
//   }
// },{//router cconfig
//   initialRouteName: 'Profile',
//   order: ['Explore','Profile','Configurations'],
//   navigationOptions:{
//     tabBarVisible: true
//   },
//   tabBarOptions:{
//     activeTintColor: ACTIVE_COLOR,
//     inactiveTintColor: INACTIVE_COLOR,
//     style: {
//       backgroundColor: stylesd.segundaCor
//     }
//   }
  
// });

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
  Artist: ArtistScreen,
  }, {
    initialRouteKey: 'Exlore',
    navigationOptions: {
      headerTransparent: true
    }
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen,
  NewSong: NewSongScreen,
  }, {
    initialRouteKey:'Profile',
    navigationOptions: {
      headerTransparent: true
    }
});

const SettingsStack = createStackNavigator({
  Configurations: ConfigurationScreen
  }, {
    initialRouteKey:'Profile',
    navigationOptions: {
      headerTransparent: true
    }
});

export default createBottomTabNavigator({
  Explore: {
    screen: ExploreStack,
    navigationOptions:{
      tarBarLabel: translate("explore"),
      tabBarIcon:({ tintColor }) => (
        <Icon name="globe" style={{color:tintColor}} size={24}/>
      )
    }
  },
  Profile:{
    screen: ProfileStack,
    navigationOptions:{
      tabBarLabel: translate("profile"),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" style={{color:tintColor}} size={24}/>
      )
    }
  },
  Configurations:{
    screen: SettingsStack,
    navigationOptions:{
      tabBarLabel: translate("configurations"),
      tabBarIcon: ({ tintColor }) => (
        <Icon active name="settings" style={{color:tintColor}} size={24}/>
      )
    }
  }
}, {//router cconfig
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

// export default createStackNavigator({
//     TabNavigator:{
//       screen: TabNavigator,
//       navigationOptions: {
//         header: null
//       }
//     },
//     EditProfile: EditProfileScreen,
//     NewSong: NewSongScreen,
//     Artist: ArtistScreen,
//   }, {
//     headerMode: 'float',
//     initialRouteKey: 'TabNavigator',
//     navigationOptions: {
//       headerTransparent: true,
//     }
//   }
// )
