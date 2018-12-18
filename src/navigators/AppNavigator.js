import React from "react"
import { Icon } from "native-base"
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation"
import translate from "../i18n/src/locales"

import {
    ExploreScreen,
    ProfileScreen,
    EditProfileScreen,
    NewSongScreen,
    ArtistScreen,
    ConfigurationScreen,
    ShareScreen,
    SectionScreen,
    OrderScreen
} from "../screens"
import stylesd from "../stylesd"

const ACTIVE_COLOR = "#fff"
const INACTIVE_COLOR = stylesd.corDeFundo

const ExploreStack = createStackNavigator(
    {
        Home: ExploreScreen,
        Artist: ArtistScreen,
        Section: SectionScreen
    },
    {
        initialRouteKey: "Home",
        navigationOptions: {
            headerTransparent: true
        }
    }
)

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        EditProfile: EditProfileScreen,
        NewSong: NewSongScreen,
        Share: ShareScreen
    },
    {
        initialRouteKey: "Profile",
        navigationOptions: {
            headerTransparent: true
        }
    }
)

const SettingsStack = createStackNavigator(
    {
        Configurations: ConfigurationScreen
    },
    {
        initialRouteKey: "Profile",
        navigationOptions: {
            headerTransparent: true
        }
    }
)

export default createBottomTabNavigator(
    {
        Home: {
            screen: ExploreStack,
            navigationOptions: {
                tarBarLabel: translate("home"),
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" style={{ color: tintColor }} size={24} />
                )
            }
        },
        Order: {
            screen: OrderScreen,
            navigationOptions: {
                tarBarLabel: translate("order"),
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="MaterialIcons"
                        name="playlist-play"
                        style={{ color: tintColor }}
                        size={24}
                    />
                )
            }
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarLabel: translate("profile"),
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="ios-person"
                        style={{ color: tintColor }}
                        size={24}
                    />
                )
            }
        },
        Configurations: {
            screen: SettingsStack,
            navigationOptions: {
                tabBarLabel: translate("configurations"),
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        active
                        name="settings"
                        style={{ color: tintColor }}
                        size={24}
                    />
                )
            }
        }
    },
    {
        initialRouteName: "Profile",
        order: ["Home", "Order", "Profile", "Configurations"],
        navigationOptions: {
            tabBarVisible: true
        },
        tabBarOptions: {
            activeTintColor: ACTIVE_COLOR,
            inactiveTintColor: INACTIVE_COLOR,
            style: {
                backgroundColor: stylesd.segundaCor
            }
        }
    }
)
