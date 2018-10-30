import { createStackNavigator } from "react-navigation";
import { 
  LoginScreen,
  RegisterScreen,
} from "../screens";
import stylesd from '../stylesd';

export default createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
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
