import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Card from '../components/Card'
import SongForm from '../components/SongForm'
import {
  View,
  Container,
  Button,
  Content,
  Item,
  Picker,
  Icon,
  CheckBox,
  Body,
  Text,
  Typography,
} from 'native-base'
import _ from 'lodash'
import DebouncedInputComponent from '../components/DebouncedInput'
import SelectableSongList from '../components/SelectableSongList'
import { styles as s } from 'react-native-style-tachyons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

class NewSongScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      searchResult: [],
      selectedSong: null,
      showSongForm: false,
      search: '',
      name: '',
      artist: '',
      selectedGenre: '',
      melodic: false,
      harmonic: false,
      song: null,
    }
  }

  saveInfo() {
    console.log(this.state)
  }

  searchSong(search) {
    this.setState({ search, loading: true, showSongForm: false })

    const url = `${CIFRACLUB_API_URL}/songs?name=${search}`

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(searchResult => {
        this.setState({ searchResult, loading: false })
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
      this.setState({ showSongForm: true })
    })
  }

  render() {
    const {
      loading,
      searchResult,
      showSongForm,
      search,
      selectedSong,
    } = this.state
    return (
      <KeyboardAwareScrollView>
        <Container style={styles.container}>
          <Content padder>
            <Text style={styles.title}>Nova música</Text>
            <Item style={styles.itemSearch}>
              <DebouncedInputComponent
                updateText={this.searchSong.bind(this)}
                placeholder="busca por música"
                style={styles.inputSearch}
              />
            </Item>

            {!!search && (
              <Card>
                <SelectableSongList
                  songs={searchResult}
                  onSelect={this.selectSong}
                />
              </Card>
            )}

            <TouchableOpacity
              onPress={() => {
                this.setState({ showSongForm: true, search: '' })
                this.searchSong.bind(this)
              }}
            >
              <Text style={[s.tc, s.mt2, s.b]}>Inserir manualmente</Text>
            </TouchableOpacity>

            {showSongForm && (
              <SongForm initialSong={selectedSong} onChange={() => {}} />
            )}

            <Button
              block
              iconLeft
              style={styles.buttonStyle}
              onPress={() => this.saveInfo()}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </Button>
          </Content>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}

export default NewSongScreen
