import React, { Component } from "react";

import { View, StyleSheet, Dimensions } from "react-native";
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

import Footer from "../components/Footer";
import Logo from "../img/logo.png";

const { width } = Dimensions.get("window");
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

export default class InitialLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  render() {
    const { search } = this.state;
    const { navigation } = this.props;
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
                    {
                      backgroundColor: "rgb(97,197,207)",
                      marginVertical: 10
                    }
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
        <Footer navigation={navigation} />
      </Container>
    );
  }
}
