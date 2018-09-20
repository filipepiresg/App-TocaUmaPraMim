import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Title,
  Subtitle,
  H1,
  Right,
  Body,
  Left,
  Item,
  Input,
  Icon,
  Button
} from "native-base";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";

import Footer from "../components/Footer";
import imgDefault from "../img/perfil.png";
import MusicRegistrationScreen from "./MusicRegistrationScreen";
import DebouncedInputComponent from "../components/DebouncedInput";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      inventory: [],
      instrument: "",
      premium: false,
      picture: "",
      search: ""
    };
    // this.receiveUser(this.props.navigation);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const {
      name,
      inventory,
      instrument,
      premium,
      picture
    } = navigation.getParam("user", {
      name: "",
      inventory: "",
      instrument: "",
      premiun: false,
      picture: ""
    });
    this.setState({ picture, instrument, inventory, name, premium });
  }

  searchSong = (search) => {
    this.setState({ search })
  }

  render() {
    const { picture, instrument, name, inventory, search } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header transparent>
          {navigation.getParam("back", false) ? (
            <Left>
              <Button onPress={() => navigation.goBack()} transparent>
                <Icon type="FontAwesome" name="angle-left" />
              </Button>
            </Left>
          ) : (
            <Left />
          )}
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Container style={styles.subContainer}>
          <Container style={styles.containerPerfil}>
            <Image
              source={picture ? { uri: picture } : imgDefault}
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
                <H1>{/* amountArtists(inventory) */ 0}</H1>
                <Text style={styles.txtInfo}>artistas diferentes</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{/* amountRitmos(inventory) */ 0}</H1>
                <Text style={styles.txtInfo}>ritmos diferentes</Text>
              </View>
            </View>
          </Container>
          <Item>
              <Icon type="FontAwesome"
                    name="plus"
                    style={{ color: "#11841a" }}
                    onPress={() => navigation.navigate("MusicRegistration")}
              />
              <Item style={styles.itemSearch}>
                  <DebouncedInputComponent
                      placeholder="busca por música, ritmo e/ou banda"
                      updateText={this.searchSong}
                      style={styles.inputSearch}
                  />
              </Item>
          </Item>
          <Content contentContainerStyle={styles.content}>
            {/*inventory
              .filter(
                value =>
                  value.music.toLowerCase().includes(search.toLowerCase()) ||
                  value.group.toLowerCase().includes(search.toLowerCase()) ||
                  value.ritmo.toLowerCase().includes(search.toLowerCase())
              )
              .map(item => (
                <Text key={item.music} style={{ padding: 5 }}>{`${
                  item.music
                } - ${item.group} - ${item.ritmo}`}</Text>
              )) */}
          </Content>
        </Container>
        <Footer navigation={navigation} />
      </Container>
    );
  }
}
