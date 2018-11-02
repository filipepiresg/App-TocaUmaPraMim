import React from 'react'
import { Alert, AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import withLoading from './withLoading'
import translate from '../../i18n/src/locales';

require('firebase/firestore')

export default WrappedComponent => {
  class withAuth extends React.Component {
    async componentDidMount() {
      const { showLoading, hideLoading } = this.props;
      showLoading();
      await firebase.auth().onAuthStateChanged(user => {
        this._verifyUser(user);
      });
      hideLoading();
    }

    _loginWithFacebook = async () => {
      const { showLoading, hideLoading } = this.props;
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '2207895276121269',
        { permissions: ['public_profile'] }
      )

      if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        // Sign in with credential from the Facebook user.
        showLoading()
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(({ user }) => {
            this._verifyUser(user).then(() => {
              hideLoading()
            })
          })
          .catch(error => {
            hideLoading()
            console.log(error)
            Alert.alert(translate("loginErrorMessage"))
          })
      } else {
        Alert.alert(translate("loginErrorMessage"))
      }
    }

    _logout = async () => {
      const { showLoading, hideLoading } = this.props;
      showLoading();
      await AsyncStorage.removeItem('loggedUser')
        .then( () => {
          this.props.navigation.navigate('AuthLoading')
          firebase.auth().signOut();
        });
      hideLoading();
    }

    /**
     * Verifies if this uid is registered in the app. If not, redirect the user to the RegisterScreen.
     * If it is, redirects him/her to the Main Screen.
     *
     * @param {String} uid
     */
    _verifyUser = async user => {
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })

      const collection = await db
        .collection('users')
        .where('authId', '==', (user && user.uid) || '')
        .get()

      if (collection.empty) {
        const { providerData, uid } = user
        this.props.navigation.navigate('Register', {
          user: providerData[0],
          authId: uid,
        })
      } else {
        collection.forEach(async user => {
          const loggedUser = {...user.data(), id: user.id}
          await AsyncStorage.setItem('loggedUser', JSON.stringify(loggedUser))
        })
        this.props.navigation.navigate('App')
      }
    }

    render() {
      return (
        <WrappedComponent
          loginWithFacebook={this._loginWithFacebook}
          logout={this._logout}
          {...this.props}
        />
      )
    }
  }

  return withLoading(withAuth)
}
