import React from "react";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";

const AppStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
    // header
  }
);
export default AppStackNavigator;
