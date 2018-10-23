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
import { View, Image, StyleSheet, Text, Dimensions, AsyncStorage, ScrollView } from "react-native";
import SelectableSongList from '../components/SelectableSongList';
import stylesd from '../stylesd';
import imgDefault from "../img/perfil.png";
import DebouncedInputComponent from "../components/DebouncedInput";
import { styles as s } from 'react-native-style-tachyons'
import withAuth from "../components/hocs/withAuth";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import translate from '../i18n/src/locales'

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
    flex: 0.5,
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
      user: "",
      inventory: [],
      instrument: "",
      premium: false,
      picture: "",
      search: "",
      didFocusSubscription: ""
    };
    // this.receiveUser(this.props.navigation);
  }

  componentDidMount() {
    const didFocusSubscription = this.props.navigation.addListener(
      'willFocus', () => this.fetchUser());
    this.setState({didFocusSubscription})
  }

  componentWillUnmount() {
    this.state.didFocusSubscription.remove();
  }

  searchSong = (search) => {
    this.setState({ search })
  }

  fetchUser = async () => {
    const username = JSON.parse(await AsyncStorage.getItem('loggedUser')).username
    const url = 'https://us-central1-tupm-app.cloudfunctions.net/getUserFromUsername?username=' + username
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(user => {
        this.setState({ user })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { photoURL, instrument, user, inventory, loading, search } = this.state;
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
            <Title>{user.name}</Title>
            <Subtitle>{instrument}</Subtitle>
            <View style={styles.containerInfo}>
              <View style={styles.typeInfo}>
                <H1>{inventory ? inventory.length : 0}</H1>
                <Text style={styles.txtInfo}>{translate("diferentSongs")}</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{ amountArtists(inventory) }</H1>
                <Text style={styles.txtInfo}>{translate("diferentArtists")}</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{ amountRitmos(inventory) }</H1>
                <Text style={styles.txtInfo}>{translate("diferentRhythms")}</Text>
              </View>
            </View>
          </Container>
          
          <Item>
            <Item style={styles.itemSearch}>
                <DebouncedInputComponent
                    placeholder={translate("nameOrRhythmOrBandSearch")}
                    updateText={this.searchSong}
                    style={styles.inputSearch}
                />
            </Item>
          </Item> */}

          <Container style={{height: '60%'}}>
            <ScrollView>
              <SelectableSongList
                          loading={loading}
                          songs={user ? user.songs : []}
                          //onSelect={this.selectSong}
                        />
            </ScrollView>
          </Container>
          
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