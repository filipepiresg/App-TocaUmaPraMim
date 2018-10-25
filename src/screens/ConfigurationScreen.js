import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage, Dimensions } from 'react-native'
import { Container, Button, Content, View } from 'native-base'
import * as firebase from 'firebase'
import { styles as s } from 'react-native-style-tachyons'
import stylesd from '../stylesd'
import translate from '../i18n/src/locales';
import LanguageSelect from '../components/LanguageSelect';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Svg } from 'expo'
import I18n from 'react-native-i18n'

require('firebase/firestore')

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginLeft: 20,
    marginBottom: 10,
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


class ConfigurationScreen extends Component {
  state = {
    valid: true,
    loading: true,
    user: null
  }

  async updateInfo() {
    const { user } = this.state
    const db = firebase.firestore()
    const dbUsers = db.collection('users')
    firebase.auth().onAuthStateChanged((currentUser) => {
      dbUsers.where("authId", "==", currentUser.uid).get()
      .then( userLogged => {
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
        //   console.log(user.docs[0].data())
        this.setState({user: user.docs[0].data()}, () => this.setState({loading: false}));
      })
    });
  }

  async save() {
    console.log(this.state.user.language)
    const { user } = this.state
    I18n.locale = user.language
    
    this.updateInfo()
  }

  onLanguageChange = language => {
      console.log(language)
      const updatedUser = this.state.user
      updatedUser.language = language
      this.setState({ user: updatedUser })
  }

  renderLoader = () => {
    return null;
  }

  render() {
    const { loading, valid, user } = this.state
    if (loading) return (this.renderLoader())
    return (
      <Container style={styles.container}>
        <Content padder>
          <Text style={styles.title}>{translate("configurations")}</Text>
          <View style={[s.mt2]}>
            <LanguageSelect 
                selectedLanguage={user.language}
                onChange={(language) => this.onLanguageChange(language)} />
          </View>
          <Button
            block
            iconLeft
            style={[styles.buttonStyle, valid && styles.bgOurBlue]}
            onPress={() => this.save()}
          >
            <Text style={styles.buttonText}>{translate("save")}</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default ConfigurationScreen
