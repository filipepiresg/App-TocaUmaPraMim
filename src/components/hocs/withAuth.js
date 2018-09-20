import React from "react";
import * as firebase from 'firebase';

const _loginWithFacebook = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '2207895276121269',
    { permissions: ['public_profile'] }
  );

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(({ user })=>{
      console.log(user);
    }).catch((error) => {
      console.log('Esse erro deve ser tratado e deve ser exibido um feedback para o usuário');
      console.log(error);
    });
  } else {
    console.log('Esse cenário deve ser tratado e deve ser exibido um feedback para o usuário');
  }
}

const _verifyUser = async (uid) => {  }

export default (WrappedComponent) => {
  class withAuth extends React.Component {
    render() {
      return (
        <WrappedComponent loginWithFacebook={_loginWithFacebook} {...this.props} />
      );
    }
  }

  return withAuth;
}
