import { createStackNavigator } from 'react-navigation'
import { LoginScreen, InfoScreen } from '../screens'

export default createStackNavigator(
  {
    Login: LoginScreen,
    Info: InfoScreen,
  },
  {
    initialRouteName: 'Login',
  }
)
