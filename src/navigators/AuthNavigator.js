import { createStackNavigator } from "react-navigation";
import { LoginScreen, InfoScreen, InitialLoginScreen } from "../screens";

export default createStackNavigator(
  {
    // Login: LoginScreen,
    Login: InitialLoginScreen,
    Info: InfoScreen
  },
  {
    initialRouteName: "Login"
  }
);
