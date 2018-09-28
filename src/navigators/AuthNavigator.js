import { createStackNavigator } from "react-navigation";
import { 
  InfoScreen,
  LoginScreen,
  RegisterScreen,
  MusicRegistrationScreen
} from "../screens";

export default createStackNavigator(
  {
    Info: InfoScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    MusicRegistration: MusicRegistrationScreen
  },
  {
    initialRouteName: "Login",
  }
);
