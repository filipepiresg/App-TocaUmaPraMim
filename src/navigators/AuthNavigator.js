import { createStackNavigator } from "react-navigation";
import { LoginScreen, InfoScreen, RegisterScreen } from "../screens";
import MusicRegistrationScreen from "../screens/MusicRegistrationScreen";

export default createStackNavigator(
  {
    // Login: LoginScreen,
    Login: LoginScreen,
    Info: InfoScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: "Login"
  }
);
