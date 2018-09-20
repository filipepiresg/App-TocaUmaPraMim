import * as firebase from "firebase";
import React, { Component } from "react";
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import {
  Container,
  Button,
  Icon,
  Content,
  Body,
  Thumbnail,
  Item,
  Input,
  Text
} from "native-base";
import Expo from "expo";

import Footer from "../components/Footer";
import Logo from "../img/logo.png";
import withAuth from "../components/hocs/withAuth";

const { width } = Dimensions.get("window");

// const fbID = "2185612565044522";
const fbID = "2207895276121269";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
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
    borderColor: "rgb(97,197,207)",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  btn: {
    justifyContent: "flex-start"
  }
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  /**
   * faz o login com as credenciais do facebook
   */
  async loginFb() {
    Expo.Facebook.logInWithReadPermissionsAsync(
      fbID,
      { permissions: ["public_profile", "email"] }
    ).then(({ type, token}) => {
      console.log('SÓ DEU CERTO');
      console.log(token)
      // if (type === "success") {
      //   const response = await fetch(
      //     `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      //   );
  
      //   const { id } = await response.json();
      //   const { navigation } = this.props;
      //   try {
      //     const dbUsers = await firebase.database().ref("users");
      //     firebase.auth().languageCode = "pt-BR";
      //     const {
      //       user
      //     } = await firebase
      //       .auth()
      //       .signInAndRetrieveDataWithCredential(
      //         firebase.auth.FacebookAuthProvider.credential(token)
      //       );
      //     dbUsers.once('value', snapshot => {
      //       if(!snapshot.val() || !Object.getOwnPropertyNames(snapshot.val()).includes(user.uid) ) {
      //         this.createUserDb(id, user);
      //       }
      //     })
      //     navigation.navigate("Explore");
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    }, (err) => {
      console.log('OCORREU UM ERRO');
      console.log(err);
    });
    
  }

  /**
   * cria o usuario no banco de dados realtime database do firebase
   */
  createUserDb = (id=String, user=Object) => {
    const dbUsers = firebase.database().ref("users");
    const dataUser = {
      name: user.displayName,
      email: user.email,
      picture: `https://graph.facebook.com/${id}/picture`,
      instruments: [],
      inventory: [],
      premium: false,
      visible: true
    };
    // esta sendo criado o usuario no database
    // colocar na page de criacao do perfil
    dbUsers.child(`${user.uid}`).set({
      ...dataUser
    });
  }

  render() {
    const { search } = this.state;
    const { navigation, loginWithFacebook } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Body>
            <Thumbnail source={Logo} style={styles.thumbnailLogo} square />
            <Text style={[styles.txt, { marginVertical: 30, fontSize: 19 }]}>
              Compartilhe as músicas que você sabe e descubra quais seus amigos
              tocam!
            </Text>
            <View style={styles.subContainer}>
              <View style={styles.containerBusca}>
                <Text style={[styles.txt, { fontWeight: "100" }]}>
                  Veja o repertório de alguém
                </Text>
                <Button
                  block
                  iconLeft
                  style={[
                    styles.btn,
                    { backgroundColor: "rgb(97,197,207)", marginVertical: 10 }
                  ]}
                >
                  <Icon type="FontAwesome" name="camera" />
                  <Text>Tag Friend</Text>
                </Button>
                <Item>
                  <Input
                    placeholder="Digite o usuario"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      borderWidth: 2,
                      borderColor: "rgb(97,197,207)",
                      backgroundColor: "#fff"
                    }}
                    value={search}
                    onChangeText={txt => this.setState({ search: txt })}
                    returnKeyType="search"
                  />
                </Item>
              </View>
              <View style={styles.containerCadastro}>
                <Text style={[styles.txt, { fontWeight: "100" }]}>
                  Você é músico?
                </Text>
                <Button
                  block
                  iconLeft
                  onPress={() => loginWithFacebook()}
                  style={[styles.btn, { backgroundColor: "rgb(80,114,166)" }]}
                >
                  <Icon type="FontAwesome" name="facebook" />
                  {/* <Text style={{ fontSize: 12 }}>logar com facebook</Text> */}
                </Button>
                <Button
                  block
                  iconLeft
                  style={[styles.btn, { backgroundColor: "rgb(28,117,202)" }]}
                >
                  <Icon type="FontAwesome" name="google" />
                  {/* <Text style={{ fontSize: 12 }}>logar com google</Text> */}
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