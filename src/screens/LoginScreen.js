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
import SearchButton from '../components/SearchButton';
import stylesd from '../stylesd';
import Logo from "../img/logo.png";
import withAuth from "../components/hocs/withAuth";
import translate from "../i18n/src/locales";

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
    loading: false,
    search: ''
  }

  async lookingForArtist(search) {
    this.setState({loading: true})
    const db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    const users = await db.collection('users')
    .where('username','==',search)
      .get()
    if (users.empty){
      this.setState({ loading: false })
      return Alert.alert(translate("userNotFoundMessage"),'', [{text: 'Voltar', style:'destructive'}])
    }
    const { username } = users.docs[0].data()
    this.props.navigation.navigate("LookingArtist", { username, back: true })
    this.setState({ search: '' })
  }

  render() {
    const { search, loading } = this.state;
    const { loginWithFacebook } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Body>
            <Thumbnail source={Logo} style={styles.thumbnailLogo} square />
            <Text style={[styles.txt, styles.txtSobreApp]}>
              {translate("aboutAppMessage")}
            </Text>
            <View style={styles.subContainer}>
              <View style={styles.containerBusca}>
                <Text style={[styles.txt, styles.txtSobreContainer]}>
                {translate("seeSomeonesRepertoire")}
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
                  <Text>{translate("tagFriend")}</Text>
                </Button>
                <Item style={{borderBottomColor: 'transparent'}}>
                  <Input
                    value={search}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                    style={styles.inputBusca}
                    placeholder={translate("typeTheUser")}
                    onChangeText={txt => this.setState({ search: txt })}
                  />
                  <SearchButton loading={loading}
                                onPress={() => this.lookingForArtist(search)}
                                style={{marginLeft: 7, marginRight: -8, color: stylesd.segundaCor}}>
                  </SearchButton>
                </Item>
              </View>
              <View style={styles.containerCadastro}>
                <Text style={[styles.txt, styles.txtSobreContainer]}>
                {translate("areYouAMusician")}
                </Text>
                <Button
                  block
                  iconLeft
                  onPress={() => loginWithFacebook()}
                  style={[styles.btn, { backgroundColor: "rgb(80,114,166)" }]}
                >
                  <Icon type="FontAwesome" name="facebook" />
                  <Text style={{ fontSize: 14 }}>{translate("loginWithFacebook")}</Text>
                </Button>
                <Button
                  block
                  iconLeft
                  style={[styles.btn, { backgroundColor: "rgb(28,117,202)" }]}
                >
                  <Icon type="FontAwesome" name="google" />
                  <Text style={{ fontSize: 14 }}>{translate("loginWithGoogle")}</Text>
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