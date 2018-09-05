import React, { Component } from 'react'
import {
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import { Content, Container, Text } from 'native-base'

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  /**
   * Verifica se existe um token salvo no celular do usuário, o que
   * garante que ele está autenticado.
   *
   * Caso esteja, redireciona para o aplicativo. Senão, direciona para a página de login
   */
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('firebaseAuthToken')

    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})
