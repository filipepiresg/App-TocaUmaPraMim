import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'

import {
  Container,
  Button,
  Content
} from 'native-base'
import * as firebase from 'firebase';

import stylesd from '../stylesd';
import UsernameInput from '../components/UsernameInput';
import ProfileForm from '../components/ProfileForm';

require('firebase/firestore')


const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 20,
  },
  container: {
    backgroundColor: stylesd.corDeFundo,
  },
  buttonStyle: {
    backgroundColor: stylesd.segundaCor,
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

export default class EditProfileScreen extends Component {
    constructor (props) {
        super(props);
    }
  state = {
    user:
    loading: false
  }

  async saveInfo(authId) {
    const { name, username, stateCode, city } = this.state
    const { photoURL } = this.props.navigation.getParam('user', {
      photoURL:''
    })
    const dbUsers = firebase.firestore().collection('users')
    await dbUsers.add({
      fullName: name,
      stateCode,
      username,
      city,
      authId,
      photoURL
    }).then( () => {
      // AsyncStorage.setItem('firebaseAuthToken', authId)
      this.props.navigation.navigate('App')
    })
  }

  componentWillMount() {
    const {displayName} = this.props.navigation.getParam('user', { 
      displayName:''
    });
    const db = firebase.firestore()
    const dbUsers = db.collection('users')
    firebase.auth().onAuthStateChanged((currentUser) => {
      dbUsers.where("authId", "==", currentUser.uid).get()
      .then( user => {
        this.setState({user: user.docs[0].data()});
      })
     
      
     });
    this.setState({  name: displayName })
  }

  updateState(user){
    console.log(user);
      this.setState({name: user.name,
        username: user.username,
       stateCode: user.stateCode,
        city: user.city});
  }
  
  render() {

    const authId = this.props.navigation.getParam('authId', '');
    return (
    <Container style={styles.container}>
      <Content padder>
        <Text style={styles.title}>Editar Perfil</Text>
        <ProfileForm user = {this.state} onChange={user => this.updateState(user)}/>

        <Button
              block
              iconLeft
              style={styles.buttonStyle}
              onPress={() => this.saveInfo(authId)}
        >
        <Text style={styles.buttonText}>Cadastrar</Text>
        </Button>
        
      </Content>
      
    </Container>
             
    )
  } 
}