import { createSwitchNavigator } from 'react-navigation';

import { AuthLoadingScreen } from '../screens';
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);