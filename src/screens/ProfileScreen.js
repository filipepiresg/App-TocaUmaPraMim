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
// import instrumento from "../img/violao.jpg";
// import styles from './styles';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
  },
  contentMusicas: {
    backgroundColor: "#fff"
  },
  subContainer: {
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
    borderRadius: 20,
    marginVertical: 10
  },
  containerInfo: { flex: 1, flexDirection: "row" },
  imgPerfil: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2
  },
  containerPerfil: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});

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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      repertorio: [],
      instrumento: "",
      premium: false,
      id: 0,
      imagem: "",
      busca: ""
    };
  }

  componentDidMount() {
    const {
      nome,
      repertorio,
      instrumento,
      premium,
      id,
      imagem
    } = this.props.navigation.getParam("user", {
      nome: "",
      musicas: [{ banda: "", musica: "", ritmo: "" }],
      instrumento: "",
      premiun: false,
      id: 0,
      imagem: ""
    });
    this.setState({ id, imagem, instrumento, repertorio, nome, premium });
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
        <Container style={styles.subContainer}>
          <Container style={styles.containerPerfil}>
            <Image
              source={this.state.imagem ? { uri: this.state.imagem } : perfil}
              style={styles.imgPerfil}
              resizeMode="cover"
            />
            <Title>{this.state.nome}</Title>
            <Subtitle>{this.state.instrumento}</Subtitle>
            <View style={styles.containerInfo}>
              <View style={styles.containerQtd}>
                <Title>{contArtistas(this.state.repertorio)}</Title>
                <Subtitle>qtd de artistas</Subtitle>
              </View>
              <View style={styles.containerQtd}>
                <Title>{contMusicas(this.state.repertorio)}</Title>
                <Subtitle>qtd de artistas</Subtitle>
              </View>
            </View>
          </Container>
          <Item style={styles.itemBusca}>
            <Icon name="search" />
            <Input
              placeholder="busca por música, ritmo e/ou banda"
              onChangeText={busca => this.setState({ busca })}
            />
          </Item>
          <Content contentContainerStyle={styles.contentMusicas}>
            {this.state.repertorio
              .filter(
                value =>
                  value.musica
                    .toLowerCase()
                    .includes(this.state.busca.toLowerCase()) ||
                  value.banda
                    .toLowerCase()
                    .includes(this.state.busca.toLowerCase()) ||
                  value.ritmo
                    .toLowerCase()
                    .includes(this.state.busca.toLowerCase())
              )
              .map(item => (
                <Text key={item.musica} style={{ padding: 5 }}>{`${
                  item.musica
                } - ${item.banda} - ${item.ritmo}`}</Text>
              ))}
          </Content>
        </Container>
        <Footer navigation={this.props.navigation} />
      </Container>
    );
  }
}
