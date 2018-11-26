import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Content } from 'native-base'
import * as firebase from 'firebase'
import stylesd from '../stylesd'
import QRCodeGenerator from '../components/QRCodeGenerator';
import withAuth from "../components/hocs/withAuth";

require('firebase/firestore')

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginLeft: 20,
    marginTop: 30 ,
    textAlign: 'center',
    flex: 1
  },
  subcontainer: {
    marginTop: 30
  },
  container: {
    display:'flex',
    backgroundColor: stylesd.corDeFundo,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qrCode: {
    flex: 5,
    marginTop: -10
  }
})

class ShareScreen extends Component {
  state = {
    loading: true,
    uid: null
  }

  componentDidMount() {
    const db = firebase.firestore()
    const dbUsers = db.collection('users')
    firebase.auth().onAuthStateChanged((currentUser) => {
     this.setState({uid: currentUser.uid}, ()=> this.setState({loading: false}));
    })
  }


  renderLoader = () => {
    return null;
  }

  render() {
    const { loading, uid } = this.state
    if (loading) return (this.renderLoader())
    return (
      <Container style={styles.container}>
            <Text style={styles.title} > Compartilhe seu QRcode</Text>
            <View style={styles.qrCode}>
              <QRCodeGenerator userId={uid}/>
            </View>
      </Container>
    )
  }
}

export default withAuth(ShareScreen)
