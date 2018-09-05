import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Title,
  Subtitle,
  Right,
  Body,
  Left,
  Item,
  Input,
  Icon
} from "native-base";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";

import Footer from "../components/Footer";
import perfil from "../img/perfil.png";
import instrumento from "../img/violao.jpg";
// import styles from './styles';

const { width } = Dimensions.get("window");

const contArtistas = (lista = [Object]) => {
  let qtdBandas = 0;
  if (lista.length > 0) {
    const bandas = [];
    lista.forEach(item => {
      if (!bandas.includes(item.banda.toLowerCase())) {
        bandas.push(item.banda.toLowerCase());
      }
    });
    qtdBandas = bandas.length;
  }
  return qtdBandas;
};

const contMusicas = (lista = [Object]) => {
  let qtdMusicas = 0;
  if (lista.length > 0) {
    const musicas = [];
    lista.forEach(item => {
      if (!musicas.includes(item.musica.toLowerCase())) {
        musicas.push(item.musica.toLowerCase());
      }
    });
    qtdMusicas = musicas.length;
  }
  return qtdMusicas;
};

//
const user = {
  id: 7,
  nome: "Luciano Júnior",
  image: "",
  instrumento: "Violão",
  musicas: [
    {
      musica: "Muito pra te dar",
      banda: "Magnificos",
      ritmo: "Forró"
    },
    {
      musica: "Disritmia",
      banda: "Cartola",
      ritmo: "Samba"
    },
    {
      musica: "Mudar pra quê",
      banda: "Os Nonatos",
      ritmo: "Sertanejo"
    },
    {
      musica: "Coração",
      banda: "Dorgival Dantas",
      ritmo: "Forró"
    },
    {
      musica: "Nota Dez",
      banda: "Xand Avião",
      ritmo: "Forró"
    },
    {
      musica: "Yellow",
      banda: "Coldplay",
      ritmo: "Rock"
    },
    {
      musica: "Chorando Se Foi",
      banda: "Calypson",
      ritmo: "Lambada"
    },
    {
      musica: "Mama",
      banda: "Waleska Popozuda",
      ritmo: "Funk"
    }
  ],
  premium: true
};

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    const user = this.props.navigation.getParam("user", {});
    this.state = {
      nome: user.nome,
      musicas: user.musicas,
      instrumento: user.instrumento,
      premium: user.premium,
      id: user.id,
      imagem: user.imagem
    };
  }

  render() {
    // const user = this.props.navigation.getParam("user", {});
    return (
      <Container style={styles.container}>
        <Header transparent>
          <Right />
          <Body>
            <Title>{this.state.nome}</Title>
            <Subtitle>{this.state.instrumento}</Subtitle>
          </Body>
          <Left />
        </Header>
        <Container
          style={{
            backgroundColor: "transparent",
            alignItems: "center",
            borderWidth: 1
          }}
        >
          <Image
            source={this.state.imagem ? { uri: this.state.imagem } : perfil}
            style={{
              width: width * 0.3,
              height: width * 0.3,
              borderRadius: (width * 0.3) / 2
            }}
            resizeMode="cover"
          />
        </Container>
        <Item
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            alignContent: "center"
          }}
        >
          <Icon name="search" />
          <Input
            placeholder="busca por música, ritmo e/ou banda"
            onChangeText={busca => false}
          />
        </Item>
        <Container style={{ borderWidth: 1, backgroundColor: "transparent" }} />
        <Footer navigation={this.props.navigation} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
  },
  contentMusicas: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: "#fff"
    // borderWidth:1
  }
});
