import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Svg } from 'expo'
import { styles as s } from 'react-native-style-tachyons'

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

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 20,
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

export default class EditProfileScreen extends Component {
    constructor (props) {
        super(props);
    }
  state = {
    user: null,
    valid: false,
    loading: true
  }


  renderLoader = () => {
    const cardWidth = width / 2 - 34
    const cardHeight = 160

    return (
      <View style={[s.pa2, s.pl3]}>
        <SvgAnimatedLinearGradient
          width={width}
          height={400}
          primaryColor="#f3f3f3"
          secondaryColor="#ffefd7"
        >
          {[0,1,2,3,4,5].map(i => (<Svg.Rect
            key={i}
            x={i % 2 == 0 ? 5 : cardWidth + 25}
            y={Math.floor(i/2) * cardHeight + 40}
            rx="0"
            ry="0"
            width={cardWidth}
            height={140}
          />))}
          
        </SvgAnimatedLinearGradient>
      </View>
    )
  }
  async updateInfo() {
    const { user } = this.state
    const db = firebase.firestore()
    const dbUsers = db.collection('users')
    firebase.auth().onAuthStateChanged((currentUser) => {
      dbUsers.where("authId", "==", currentUser.uid).get()
      .then( userLogged => {
        console.log(userLogged.docs[0].ref);
        console.log(user);
        let batch = db.batch();
        batch.update(userLogged.docs[0].ref, user);
        batch.commit().catch(err => console.error(err));
        this.props.navigation.navigate('App')
      })
     
      
    });
  }

  componentDidMount() {
    const db = firebase.firestore()
    const dbUsers = db.collection('users')
    firebase.auth().onAuthStateChanged((currentUser) => {
      dbUsers.where("authId", "==", currentUser.uid).get()
      .then( user => {
        this.setState({user: user.docs[0].data()}, () => this.setState({loading: false}));
      })
     
      
    });
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
    const { user,loading, valid } = this.state
    const authId = this.props.navigation.getParam('authId', '');
    if (loading) return (this.renderLoader())
    return (
    <Container style={styles.container}>
      <Content padder>
        <Text style={styles.title}>Editar Perfil</Text>
        <ProfileForm initialUser = {user} 
                     editMode={true}
                     onChange={updatedUser => this.updateUser(updatedUser)}/>

        <Button
              block
              iconLeft
              style={[styles.buttonStyle, valid && styles.bgOurBlue]}
              disabled={!valid}
              onPress={() => this.updateInfo()}
        >
        <Text style={styles.buttonText}>Salvar</Text>
        
        </Button>

      </Content>
      
    </Container>
             
    )
  } 
}