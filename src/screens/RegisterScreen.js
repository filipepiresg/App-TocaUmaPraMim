import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage } from 'react-native'
import { Container, Button, Content, View } from 'native-base'
import * as firebase from 'firebase'
import { styles as s } from 'react-native-style-tachyons'

import stylesd from '../stylesd'
import ProfileForm from '../components/ProfileForm'

require('firebase/firestore')

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginLeft: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 20,
  },
  container: {
    backgroundColor: stylesd.corDeFundo,
  },
  bgOurBlue: {
    backgroundColor: stylesd.segundaCor,
  },
  buttonStyle: {
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 25,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
})

class RegisterScreen extends Component {
  state = {
    user: null,
    valid: false,
    loading: false,
  }

  async saveInfo() {
    const { user } = this.state

    const dbUsers = firebase.firestore().collection('users')
    await dbUsers.add(user).then(() => {
      // AsyncStorage.setItem('firebaseAuthToken', authId)
      this.props.navigation.navigate('App')
    })
  }

  componentWillMount() {
    const { getParam } = this.props.navigation;

    const {
      photoURL,
      displayName: name,
      email,
      providerId,
    } = getParam('user')

    const authId = getParam('authId')

    this.setState({ user: { authId, photoURL, name, email, providerId } })
  }

  updateUser = userData => {
    this.setState({ user: { ...userData } }, () => this.validateUser())
  }

  // Enhacement: Verify which one of the erros and send a proper message
  validateUser = () => {
    const { user } = this.state
    let isValid = true
    // Removing location's validation because @caiofelipeam is still fixing it
    // (it's not returning correctly)
    if (!user || !user.name || !user.username) isValid = false
    else {
      if (user.name.length < 10) isValid = false
      if (user.username.length < 10) isValid = false
    }
    this.setState({ valid: isValid })
  }

  render() {
    const { user, loading, valid } = this.state

    return (
      <Container style={styles.container}>
        <Content padder>
          <Text style={styles.title}>Só mais um pouco...</Text>
          <Text style={styles.subtitle}>Complete seus dados cadastrais</Text>
          <View style={[s.mt2]}>
            <ProfileForm
              initialUser={user}
              onChange={userData => this.updateUser(userData)}
            />
          </View>
          {/** Enhacement: Create an (ButtonPP or something) where it will change its visual state when loading is true*/}
          <Button
            block
            iconLeft
            style={[styles.buttonStyle, valid && styles.bgOurBlue]}
            disabled={!valid}
            onPress={() => this.saveInfo()}
          >
            <Text style={styles.buttonText}>Finalizar Cadastro</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default RegisterScreen
