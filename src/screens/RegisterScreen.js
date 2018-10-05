import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {
  Container,
  Button,
  Content,
  Header,
  Form,
  Item,
  Label,
  Input
} from 'native-base'
import * as firebase from 'firebase';
import UsernameInput from '../components/UsernameInput';
import ProfileForm from '../components/ProfileForm';

require('firebase/firestore')


const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 20,
  },
  container: {
    backgroundColor: 'rgb(255,239,215)',
  },
  buttonStyle: {
    backgroundColor: 'rgb(72,186,196)',
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

export default class RegisterScreen extends Component {
    constructor (props) {
        super(props);
    }
  state = {
    name: '',
    username: '',
    stateCode: '',
    city: ''
  }

  async saveInfo(authId) {
    const { name, username, stateCode, city } = this.state
    console.log(this.state);
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
      this.props.navigation.navigate('Explore')
    })
  }

  componentWillMount() {
    const {displayName} = this.props.navigation.getParam('user', { 
      displayName:''
    });
    this.setState({ name: displayName })
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
        <Header transparent />
        <Text style={styles.title}>Só mais um pouco...</Text>
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