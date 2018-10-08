import { createStackNavigator } from "react-navigation";
import { 
  InfoScreen,
  LoginScreen,
  RegisterScreen,
} from "../screens";
import stylesd from '../stylesd';

export default createStackNavigator(
  {
    Info: InfoScreen,
    Login: LoginScreen,
    Register: RegisterScreen  
  },
  {
    headerMode: 'float',
    initialRouteName: "Login",
    navigationOptions: {
      headerStyle: {
        backgroundColor: stylesd.corDeFundo,
        borderBottomColor:'transparent'
      },
    }
  }
);
