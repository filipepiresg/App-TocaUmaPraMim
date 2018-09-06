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
      if (!bandas.includes(item.banda)) {
        bandas.push(item.banda);
      }
    });
    qtdBandas = bandas.length;
  }
  return qtdBandas;
};

const contMusicas = (lista = [Object]) => {
  // console.log(lista.musicas);
  let qtdMusicas = 0;
  if (lista.length > 0) {
    const musicas = [];
    lista.forEach(item => {
      if (!musicas.includes(item.musica)) {
        musicas.push(item.musica);
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
    return (
      <Container style={styles.container}>
        <Header transparent>
          <Right />
          <Body>
            <Title>Profile</Title>
          </Body>
          <Left />
        </Header>
        <Container style={styles.containerProfile}>
          <Container style={styles.subContainerPerfil}>
            <Image
              source={this.state.imagem ? { uri: this.state.imagem } : perfil}
              style={styles.imgPerfil}
              resizeMode="cover"
            />
            <Title>{this.state.nome}</Title>
            <Subtitle>{this.state.instrumento}</Subtitle>
            <View style={styles.containerInfo}>
              <View style={styles.containerQtd}>
                <Title>{contArtistas(this.state.musicas)}</Title>
                <Subtitle>qtd de artistas</Subtitle>
              </View>
              <View style={styles.containerQtd}>
                <Title>{contMusicas(this.state.musicas)}</Title>
                <Subtitle>qtd de artistas</Subtitle>
              </View>
            </View>
          </Container>
          <Item style={styles.itemBusca}>
            <Icon name="search" />
            <Input
              placeholder="busca por música, ritmo e/ou banda"
              onChangeText={busca => false}
            />
          </Item>
          <Content style={styles.contentMusicas}>
            {this.setState.musicas.forEach((item, index) => {
              <Text key={index}>{JSON.stringify(item)}</Text>;
            })}
          </Content>
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
  contentMusicas: {
    marginTop: 10,
    backgroundColor: "#fff"
  },
  containerProfile: {
    backgroundColor: "transparent",
    marginHorizontal: 30
  },
  containerQtd: {
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap"
  },
  itemBusca: {
    backgroundColor: "#fff",
    borderRadius: 20
  },
  containerInfo: { flex: 1, flexDirection: "row" },
  imgPerfil: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2
  },
  subContainerPerfil: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 0.7,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});
