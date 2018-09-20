import { createStackNavigator } from "react-navigation";
import { LoginScreen, InfoScreen, InitialLoginScreen } from "../screens";
import MusicRegistrationScreen from "../screens/MusicRegistrationScreen";

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
