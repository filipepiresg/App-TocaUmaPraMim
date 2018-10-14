import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Card from '../components/Card'
import SongForm from '../components/SongForm'
import { Container, Button, Content, Item, Picker, Text } from 'native-base'
import _ from 'lodash'
import DebouncedInputComponent from '../components/DebouncedInput'
import SelectableSongList from '../components/SelectableSongList'
import { styles as s } from 'react-native-style-tachyons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SongModeToggler from '../components/SongModeToggler'
import TupmButton from '../components/tupm/TupmButton'

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
    invalid: true,
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

  updateSong = song => {
    this.verifySong(song)
    this.setState({ song })
  }

  verifySong = song => {
    console.log('VERIFY SONG')
    console.log(song)
    if (!song || !song.name || !song.artist) return;
    this.setState({valid: true})
  }

  saveSong = () => {
    const { song } = this.state
    // Saves the song related to the current user authenticated
    // May retrieve from the Async Storage the current user id (not its authid)
  }

  render() {
    const {
      loading,
      loadingSongs,
      invalid,
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
            {(!showSongForm) && <Item style={styles.itemSearch}>
              <DebouncedInputComponent
                updateText={this.searchSong}
                placeholder="busque online sua música"
                style={styles.inputSearch}
              />
            </Item>}

            {!!search && (pristine || !showSongForm) && (
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
              disabled={invalid}
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
