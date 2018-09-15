import { createStackNavigator } from "react-navigation";
import { LoginScreen, InfoScreen, InitialLoginScreen } from "../screens";

export default createStackNavigator(
  {
    // Login: LoginScreen,
    Login: LoginScreen,
    Info: InfoScreen
  },
  {
    initialRouteName: "Login"
  }
);
