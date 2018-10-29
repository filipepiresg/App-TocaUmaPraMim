import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Container, Content, Title, Subtitle, H1 } from 'native-base';


import stylesd from '../stylesd';
import imgDefault from "../img/perfil.png";
import translate from '../i18n/src/locales';
import SelectableSongList from '../components/SelectableSongList';

const { width } = Dimensions.get("window");

const amountArtists = (inventory = []) => {
  let amountArtists = 0;
  if (inventory.length > 0) {
    const artists = [];
    inventory.forEach(item => {
      if (item.artist && !artists.includes(item.artist)) {
        artists.push(item.artist);
      }
    });
    amountArtists = artists.length;
  }
  return amountArtists;
};

const amountGenres = (inventory = []) => {
  let amountGenres = 0;
  if (inventory.length > 0) {
    const genres = [];
    inventory.forEach(item => {
      if (item.genre && !genres.includes(item.genre)) {
        genres.push(item.genre);
      }
    });
    amountGenres = genres.length;
  }
  return amountGenres;
};

export default class UserScreen extends Component {
  state = {
    authId:'',
    city:'',
    email:'',
    language:'',
    name:'',
    photoURL:'',
    providerId:'',
    songs: [],
    stateCode: '',
    username:''
  }
  componentDidMount() {
    const { navigation } = this.props;
    const { username } = navigation.getParam('user', undefined);
    const url = 'https://us-central1-tupm-app.cloudfunctions.net/getUserFromUsername?username='  + username;
    
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(user => {
        // I18n.locale = user.language
        this.setState( user )
      })
      .catch(error => {
        console.log(error)
      }
    )
  }

  render() {
    const { photoURL, instrument, name, songs } = this.state;
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
            <Subtitle>{/* instrument */''}</Subtitle>
            <View style={styles.containerInfo}>
              <View style={styles.typeInfo}>
                <H1>{songs ? songs.length : 0}</H1>
                <Text style={styles.txtInfo}>{translate("diferentSongs")}</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{ amountArtists(songs) }</H1>
                <Text style={styles.txtInfo}>{translate("diferentArtists")}</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{ amountGenres(songs)  }</H1>
                <Text style={styles.txtInfo}>{translate("diferentRhythms")}</Text>
              </View>
            </View>
          </Container>
          <Container style={{flex: 1, marginTop: 10}}>
            <ScrollView>
                <SelectableSongList
                  loading={false}
                  // loading={loading}
                  songs={songs ? songs : []}
                  // search={ search }
                  //onSelect={this.selectSong}
                />
              </ScrollView>
          </Container>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo,
    paddingBottom: 20
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
