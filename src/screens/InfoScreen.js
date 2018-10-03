import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { Container, Content, Title, Subtitle, H1, } from 'native-base';


import stylesd from '../stylesd';
import imgDefault from "../img/perfil.png";

const { width } = Dimensions.get("window");

const amountArtists = (inventory = []) => {
  let qtdBandas = 0;
  if (inventory.length > 0) {
    const groups = [];
    inventory.forEach(item => {
      if (item.group && !groups.includes(item.group)) {
        groups.push(item.group);
      }
    });
    qtdBandas = groups.length;
  }
  return qtdBandas;
};

const amountRitmos = (inventory = []) => {
  let amountRitmo = 0;
  if (inventory.length > 0) {
    const ritmos = [];
    inventory.forEach(item => {
      if (item.ritmo && !ritmos.includes(item.ritmo)) {
        ritmos.push(item.ritmo);
      }
    });
    amountRitmo = ritmos.length;
  }
  return amountRitmo;
};

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      inventory: [],
      instrument: "",
      premium: false,
      picture: "",
      search: ""}
  }
  render() {
    const { navigation } = this.props;
    const { photoURL, instrument, name, inventory, search } = this.state;
    return (
      <Container style={ styles.container }>
        <Container style={styles.subContainer}>
          <Container style={styles.containerPerfil}>
            <Image
              source={photoURL ? { uri: photoURL } : imgDefault}
              style={styles.imgPerfil}
              resizeMode="cover"
            />
            <Title>{name}</Title>
            <Subtitle>{instrument}</Subtitle>
            <View style={styles.containerInfo}>
              <View style={styles.typeInfo}>
                <H1>{inventory ? inventory.length : 0}</H1>
                <Text style={styles.txtInfo}>músicas diferentes</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{ amountArtists(inventory) }</H1>
                <Text style={styles.txtInfo}>artistas diferentes</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{ amountRitmos(inventory) }</H1>
                <Text style={styles.txtInfo}>ritmos diferentes</Text>
              </View>
            </View>
          </Container>
          <Content contentContainerStyle={styles.content}>
            {
              inventory
                .map(item => (
                  <Text key={item.music} style={{ padding: 5 }}>{`${
                    item.music
                  } - ${item.group} - ${item.ritmo}`}</Text>
                )
              ) 
            }
          </Content>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo
  },
  content: {
    backgroundColor: "#fff"
  },
  inputSearch: {
    textAlign: "center",
    fontSize: 16
  },
  subContainer: {
    backgroundColor: "transparent",
    marginHorizontal: 30
  },
  typeInfo: {
    flex: 1,
    alignItems: "center"
  },
  itemSearch: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 10,
    flex: 1
  },
  containerInfo: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10
  },
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
  },
  txtInfo: {
    textAlign: "center",
    color: "#ccc"
  }
});
