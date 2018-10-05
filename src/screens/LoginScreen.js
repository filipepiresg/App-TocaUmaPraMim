import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Alert, Modal } from "react-native";
import {
  Container,
  Button,
  Icon,
  Content,
  Body,
  Thumbnail,
  Item,
  Input,
  Text,
} from "native-base";
import firebase from 'firebase';
require('firebase/firestore')
import { compose } from "redux";

import stylesd from '../stylesd';
import Logo from "../img/logo.png";
import withAuth from "../components/hocs/withAuth";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo
  },
  subContainer: {
    marginTop: 20,
    flexDirection: "row",
    flex: 1
  },
  thumbnailLogo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 30
  },
  txt: {
    textAlign: "center",
    fontWeight: "bold"
  },
  containerCadastro: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  containerBusca: {
    paddingRight: 10,
    flex: 1,
    borderRightWidth: 2,
    borderColor: stylesd.segundaCor,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  btn: {
    justifyContent: "flex-start"
  },
  inputBusca: {
    borderWidth: 2,
    borderColor: stylesd.segundaCor,
    backgroundColor: "#fff"
  },
  txtSobreApp: { 
    marginVertical: 30, 
    fontSize: 19 
  },
  txtSobreContainer: { 
    fontWeight: "100"
 }
});

class LoginScreen extends Component {
  state = {
    search: ''
  }

  async lookingForArtist(search) {

    const db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    const usersRef = await db.collection('users')
    usersRef.where('username','==',search)
      .get()
      .then( value => {
        if (value.empty) {
          Alert.alert('Usuário não foi encontrado','', [{text: 'Voltar', style:'destructive'}])
        } else {
          this.props.navigation.navigate('Info', {user:value.docs[0].data()})
        }
        this.setState({ search: '' })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const { search } = this.state;
    const { loginWithFacebook } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Body>
            <Thumbnail source={Logo} style={styles.thumbnailLogo} square />
            <Text style={[styles.txt, styles.txtSobreApp]}>
              Compartilhe as músicas que você sabe e descubra quais seus amigos
              tocam!
            </Text>
            <View style={styles.subContainer}>
              <View style={styles.containerBusca}>
                <Text style={[styles.txt, styles.txtSobreContainer]}>
                  Veja o repertório de alguém
                </Text>
                <Button
                  block
                  iconLeft
                  style={[
                    styles.btn,
                    { backgroundColor: stylesd.segundaCor, marginVertical: 10 }
                  ]}
                >
                  <Icon type="FontAwesome" name="camera" />
                  <Text>Tag Friend</Text>
                </Button>
                <Item>
                  <Input
                    value={search}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                    style={styles.inputBusca}
                    placeholder="Digite o usuario"
                    onChangeText={txt => this.setState({ search: txt })}
                    onSubmitEditing={() => this.lookingForArtist(search)}
                  />
                </Item>
              </View>
              <View style={styles.containerCadastro}>
                <Text style={[styles.txt, styles.txtSobreContainer]}>
                  Você é músico?
                </Text>
                <Button
                  block
                  iconLeft
                  onPress={() => loginWithFacebook()}
                  style={[styles.btn, { backgroundColor: "rgb(80,114,166)" }]}
                >
                  <Icon type="FontAwesome" name="facebook" />
                  <Text style={{ fontSize: 14 }}>login com facebook</Text>
                </Button>
                <Button
                  block
                  iconLeft
                  style={[styles.btn, { backgroundColor: "rgb(28,117,202)" }]}
                >
                  <Icon type="FontAwesome" name="google" />
                  <Text style={{ fontSize: 14 }}>login com google</Text>
                </Button>
              </View>
            </View>
          </Body>
        </Content>
      </Container>
    );
  }
}

export default withAuth(LoginScreen)