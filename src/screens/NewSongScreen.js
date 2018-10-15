import React, { Component } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Container, Toast, Content, Item, Picker, Text } from 'native-base'
import _ from 'lodash'
import { styles as s } from 'react-native-style-tachyons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase'
require('firebase/firestore')

import SongModeToggler from '../components/SongModeToggler'
import TupmButton from '../components/tupm/TupmButton'
import DebouncedInputComponent from '../components/DebouncedInput'
import SelectableSongList from '../components/SelectableSongList'
import Card from '../components/Card'
import SongForm from '../components/SongForm'

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 10,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: 'rgb(72,186,196)',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: '1%',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'rgb(255,239,215)',
  },
  inputSearch: {
    textAlign: 'center',
    fontSize: 16,
  },
  itemSearch: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    flex: 1,
  },
  showInputs: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 25,
    paddingRight: 53,
    paddingTop: 7,
  },
  checkBoxStyle: {
    marginRight: 5,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  notFoundText: {
    color: 'blue',
    textAlign: 'center',
    // marginLeft: '50%',
  },
})

const CIFRACLUB_API_URL = 'https://lais.juniorluciano.com/cifra-club-api'

// TODO: Retrieve the genre from the API (already implemented)
// and merge into the song (may be selectable)
class NewSongScreen extends Component {
  state = {
    loading: false,
    loadingSongs: false,
    valid: false,
    searchResult: [],
    selectedSong: null,
    showSongForm: false,
    search: '',
    pristine: true,
    song: null,
  }

  searchSong = search => {
    this.setState({ search, loadingSongs: true, showSongForm: false })

    const url = `${CIFRACLUB_API_URL}/songs?name=${search}`

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(searchResult => {
        this.setState({ searchResult, loadingSongs: false })
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderPickerItems(list) {
    return list.map((genre, i) => {
      return <Picker.Item key={i} label={genre} value={genre} />
    })
  }

  selectSong = selectedSong => {
    this.setState({ selectedSong }, () => {
      this.setState({ showSongForm: true, pristine: false })
    })
  }

  verifySong = song => {
    if (!song || !song.name || !song.artist) return
    this.setState({ valid: true })
  }

  updateSong = song => {
    this.verifySong(song)
    this.setState({ song })
  }

  saveSong = async () => {
    this.setState({loading: true})
    try {
      const { song } = this.state
      const userString = await AsyncStorage.getItem('loggedUser')
      const loggedUser = JSON.parse(userString)

      song.userId = loggedUser.id
      await firebase
        .firestore()
        .collection('songs')
        .add(song)
        Toast.show({
          text: "Música incluída com sucesso!",
          type: "success",
          onClose: () => {
            this.props.navigation.goBack()
          }
        })
    } catch (e) {
      console.error(e)
    }
    this.setState({loading: false})
  }

  render() {
    const {
      loading,
      loadingSongs,
      valid,
      searchResult,
      showSongForm,
      search,
      selectedSong,
      pristine,
    } = this.state
    return (
      <KeyboardAwareScrollView>
        <Container style={styles.container}>
          <Content padder>
            <Text style={styles.title}>Nova música</Text>
            {!showSongForm && (
              <Item style={styles.itemSearch}>
                <DebouncedInputComponent
                  updateText={this.searchSong}
                  placeholder="busque online sua música"
                  style={styles.inputSearch}
                />
              </Item>
            )}

            {!!search &&
              (pristine || !showSongForm) && (
                <Card>
                  <SelectableSongList
                    loading={loadingSongs}
                    songs={searchResult}
                    onSelect={this.selectSong}
                  />
                </Card>
              )}

            <SongModeToggler
              showSongForm={showSongForm}
              pristine={pristine}
              onToggle={piece => {
                this.setState(piece)
              }}
            />

            {showSongForm && (
              <SongForm
                initialSong={selectedSong}
                key={(selectedSong && selectedSong.slug) || 'component-id'}
                onChange={this.updateSong}
              />
            )}

            <TupmButton
              style={[s.mt3]}
              loading={loading}
              block
              disabled={!valid}
              text="Adicionar"
              onPress={this.saveSong}
            />
          </Content>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}

export default NewSongScreen
