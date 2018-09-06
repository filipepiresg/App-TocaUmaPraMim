import { createStackNavigator } from 'react-navigation'
import { HomeScreen, ProfileScreen } from '../screens'

export default createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen
})
