import { createStackNavigator } from "react-navigation";
import { 
  LoginScreen,
  RegisterScreen,
  ArtistScreen,
} from "../screens";
import stylesd from '../stylesd';

export default createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        // header: null
        headerTransparent: true,
        // headerStyle: {
        //   headerTransparent: true
        // }
      }
    },
    Register: RegisterScreen,
    LookingArtist: {
      screen: ArtistScreen,
      navigationOptions: {
        headerTransparent: true,
        // headerStyle:{
        //   headerTransparent: true
        // }
      }
    }
  },
  {
    headerMode: 'float',
    initialRouteName: "Login",
    // navigationOptions: {
    //   header: null,
    //   headerStyle: {
    //     backgroundColor: stylesd.corDeFundo,
    //     borderBottomColor:'transparent'
    //   },
    // }
  }
);
