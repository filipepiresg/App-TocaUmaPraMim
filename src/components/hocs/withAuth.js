import React from 'react'
import { Alert, AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import withLoading from './withLoading'

require('firebase/firestore')

export default WrappedComponent => {
  class withAuth extends React.Component {

    componentDidMount() {
      this.props.showLoading();
      firebase.auth().onAuthStateChanged((user) => {
        this._verifyUser(user)
        this.props.hideLoading()
      });
    }

    _loginWithFacebook = async () => {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '2207895276121269',
        { permissions: ['public_profile'] }
      )
      
      if (type === 'success') {
        this.props.showLoading()
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        // Sign in with credential from the Facebook user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(({ user }) => {
            this._verifyUser(user)
          })
          .catch(error => {
            Alert.alert('Houve um erro ao tentar logar')
            console.log(error)
          })
      } else {
        Alert.alert('Houve um erro ao tentar logar')
      }
    }

    /**
     * Verifies if this uid is registered in the app. If not, redirect the user to the RegisterScreen.
     * If it is, redirects him/her to the Main Screen.
     *
     * @param {String} uid
     */
    _verifyUser = async user => {
      let isRegistered = false
      console.log(user);
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })

      const users = await db.collection('users').get()

      users.forEach(u => {
        if (u.data().authId == user.uid) {
          isRegistered = true
        }
      })

      this.props.hideLoading()
      if (!isRegistered) {
        const { providerData, uid } = user
        this.props.navigation.navigate('Register', {
          user: providerData[0],
          authId: uid,
        })
      } else {
        // await AsyncStorage.setItem('firebaseAuthToken', user.uid)
        this.props.navigation.navigate('App')
      }
    }

    render() {
      return (
        <WrappedComponent
          loginWithFacebook={this._loginWithFacebook}
          {...this.props}
        />
      )
    }
  }

  return withLoading(withAuth)
}
