import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import {
  Container,
  Header,
  Button,
  Input,
  Form,
  Item,
  Content,
  Label,
  Icon,
  Thumbnail
} from "native-base";

import Footer from "../components/Footer";
// import styles from './styles';
import logo from "../img/logo.png";

const { width, height } = Dimensions.get("window");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: ""
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header transparent />
        <Container
          style={{ marginHorizontal: 20, backgroundColor: "transparent" }}
        >
          <Thumbnail
            source={logo}
            square
            style={{
              width: width / 2,
              height: height / 4,
              alignSelf: "center"
            }}
            resizeMode="contain"
          />
          <Form>
            <Item
              floatingLabel
              // style={{ backgroundColor: "#fff" }}
            >
              <Label>e-mail</Label>
              <Input onChangeText={email => this.setState({ email })} />
            </Item>
            <Item
              floatingLabel
              // style={{ backgroundColor: "#fff" }}
            >
              <Label>senha</Label>
              <Input
                secureTextEntry
                onChangeText={senha => this.setState({ senha })}
              />
            </Item>
          </Form>
          <Button
            success
            full
            style={{
              marginTop: 10,
              borderRadius: 10
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Login
            </Text>
          </Button>
          <Button transparent full>
            <Text>Cadastre-se clicando aqui</Text>
          </Button>
          <Button
            style={{
              backgroundColor: "#00f",
              marginBottom: 10,
              borderRadius: 10
            }}
            full
          >
            <Icon type="FontAwesome" name="facebook" />
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Login with facebook
            </Text>
          </Button>
          <Button
            full
            style={{
              borderRadius: 10,
              backgroundColor: "#fff"
            }}
          >
            <Icon type="FontAwesome" name="google" style={{ color: "green" }} />
            <Text style={{ color: "green", fontWeight: "bold" }}>
              Login with google
            </Text>
          </Button>
        </Container>
        <Footer navigation={this.props.navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
  },
  conteudo: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  }
});
