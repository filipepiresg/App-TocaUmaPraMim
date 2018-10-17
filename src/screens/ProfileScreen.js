import React, { Component } from "react";
import * as firebase from 'firebase'
import {
  Container,
  Content,
  Title,
  Subtitle,
  H1,
  Fab,
  Item,
  Icon,
  Button } from "native-base";
import { View, Image, StyleSheet, Text, Dimensions, AsyncStorage } from "react-native";

import stylesd from '../stylesd';
import imgDefault from "../img/perfil.png";
import DebouncedInputComponent from "../components/DebouncedInput";
import { styles as s } from 'react-native-style-tachyons'
import withAuth from "../components/hocs/withAuth";

const { width } = Dimensions.get("window");

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
    marginTop: 10,
    marginBottom: 38
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
  },
  logoutButton: {
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 38,
    width: '100%',
    backgroundColor: 'red'
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: '44%'
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

class ProfileScreen extends Component {
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

  componentWillMount() {
    const { navigation } = this.props;
    const {
      name,
      inventory,
      instrument,
      premium,
      photoURL
    } = navigation.getParam("user", {
      name: "",
      inventory: "",
      instrument: "",
      premiun: false,
      photoURL: ""
    });
    this.setState({ photoURL, instrument, inventory, name, premium });
  }

  searchSong = (search) => {
    this.setState({ search })
  }

  render() {
    const { photoURL, instrument, name, inventory, search } = this.state;
    const { navigation } = this.props;
    const { logout } = this.props;
    return (
      <Container style={styles.container}>
      
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
        <Item>
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
      <Fab
            active={this.state.active}
            direction="down"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="topRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="md-menu" />
            <Button style={{ backgroundColor: '#34A34F' }}
                    onPress={()=>navigation.navigate("EditProfile")}>
              <Icon name="md-create" />
            </Button>
            <Button style={{ backgroundColor: '#FE132B' }}
                    onPress={() => logout()}>
              <Icon name="md-exit" />
            </Button>
            
        </Fab>
      <Fab
            active={true}
            direction="up"
            containerStyle={{ }}
            style={[{ backgroundColor: 'rgb(97,197,207)', marginRight: -5 }]}
            position="bottomRight"
            onPress={() => navigation.navigate("NewSong")}>
            <Icon name="add"/>
          </Fab>
    </Container>
    );
  }
}

export default withAuth(ProfileScreen);