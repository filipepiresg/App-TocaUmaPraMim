import React, { Component } from 'react'
import {
  Container,
  Title,
  Subtitle,
  H1,
  Fab,
  Item,
  Icon,
  Button,
  Thumbnail,
} from 'native-base'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  AsyncStorage,
  ScrollView,
  Platform,
  Image,
} from 'react-native'
import SelectableSongList from '../components/SelectableSongList'
import stylesd from '../stylesd'
import imgDefault from '../img/perfil.png'
import DebouncedInputComponent from '../components/DebouncedInput'
import { styles as s, wrap } from 'react-native-style-tachyons'
import withAuth from '../components/hocs/withAuth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import translate from '../i18n/src/locales'
import I18n from 'react-native-i18n'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo,
    paddingTop: Platform.OS ? 40 : 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'transparent',
  },
  inputSearch: {
    fontSize: 14,
  },
  subContainer: {
    marginHorizontal: 30,
    marginBottom: 130,
    backgroundColor: 'transparent',
  },
  typeInfo: {
    flex: 1,
    paddingHorizontal: 5, 
    alignItems: 'center',
  },
  containerInfo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 10,
  },
  imgPerfil: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  containerPerfil: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: (width * 0.3) / 2,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  txtInfo: {
    textAlign: 'center',
    color: '#ccc',
    flexWrap: 'wrap',
  },
})

const amountArtists = (songs = []) => {
  let qtdBandas = 0
  if (songs.length > 0) {
    const groups = []
    songs.forEach(song => {
      if (song.artist && !groups.includes(song.artist)) {
        groups.push(song.artist)
      }
    })
    qtdBandas = groups.length
  }
  return qtdBandas
}

const amountGenres = (songs = []) => {
  let amountGenre = 0
  if (songs.length > 0) {
    const genres = []
    songs.forEach(song => {
      if (song.genre && !genres.includes(song.genre)) {
        genres.push(song.genre)
      }
    })
    amountGenre = genres.length
  }
  return amountGenre
}

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      instrument: '',
      premium: false,
      picture: '',
      search: '',
      didFocusSubscription: '',
    }
    // this.receiveUser(this.props.navigation);
  }

  componentDidMount() {
    const didFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => this.fetchUser()
    )
    this.setState({ didFocusSubscription })
  }

  componentWillUnmount() {
    this.state.didFocusSubscription.remove()
  }

  searchSong = search => {
    this.setState({ search })
  }

  fetchUser = async () => {
    const username = JSON.parse(await AsyncStorage.getItem('loggedUser'))
      .username
    const url =
      'https://us-central1-tupm-app.cloudfunctions.net/getUserFromUsername?username=' +
      username
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(user => {
        I18n.locale = user.language
        this.setState({ user })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { instrument, user, loading, search } = this.state
    const { photoURL, songs } = user
    const { navigation } = this.props
    const { logout } = this.props
    return (
      <View style={{
        flex: 1,
        backgroundColor: stylesd.corDeFundo
      }}>
      <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height: '100%',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              alignSelf: 'stretch',
              resizeMode: 'contain',
              marginTop: -280,
              top: 0
            }}
            source={require('../img/bg_profile.png')}
          />
        </View>
        <Container style={styles.container}>
          <Container style={styles.subContainer}>
            <Container style={styles.containerPerfil}>
              <Thumbnail
                source={
                  photoURL ? { uri: photoURL + '?type=large' } : imgDefault
                }
                large
                style={styles.imgPerfil}
              />

              <Title style={[s.mt2, s.mb2, s.f4, s.primary]}>{user.name}</Title>
              <View style={styles.containerInfo}>
                <View style={styles.typeInfo}>
                  <H1>{songs ? songs.length : 0}</H1>
                  <Text style={styles.txtInfo}>
                    {translate('diferentSongs')}
                  </Text>
                </View>
                <View style={styles.typeInfo}>
                  <H1>{amountArtists(songs)}</H1>
                  <Text style={styles.txtInfo}>
                    {translate('diferentArtists')}
                  </Text>
                </View>
                <View style={styles.typeInfo}>
                  <H1>{amountGenres(songs)}</H1>
                  <Text style={styles.txtInfo}>
                    {translate('diferentRhythms')}
                  </Text>
                </View>
              </View>
            </Container>

            <Item style={[s.bg_white, s.br3, s.mb3, s.mt3, s.pl2]}>
              <DebouncedInputComponent
                placeholder={translate('nameOrRhythmOrBandSearch')}
                updateText={this.searchSong}
                style={styles.inputSearch}
              />
            </Item>

            <Container style={[s.br3]}>
              <ScrollView style={[s.br3]}>
                <SelectableSongList
                  loading={loading}
                  songs={user ? user.songs : []}
                  search={search}
                />
              </ScrollView>
            </Container>
          </Container>
          <Fab
            active={this.state.active}
            direction="down"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="topRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="md-menu" />
            <Button
              style={{ backgroundColor: '#34A34F' }}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Icon name="md-create" />
            </Button>
            <Button
              style={{ backgroundColor: '#FE132B' }}
              onPress={() => logout()}
            >
              <Icon name="md-exit" />
            </Button>
          </Fab>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={[{ backgroundColor: 'rgb(97,197,207)', marginRight: -5 }]}
            position="bottomRight"
            onPress={() => navigation.navigate('NewSong')}
          >
            <Icon name="add" />
          </Fab>
        </Container>
      </View>
    )
  }
}

export default withAuth(ProfileScreen)
