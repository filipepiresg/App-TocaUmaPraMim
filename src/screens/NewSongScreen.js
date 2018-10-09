import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import CardSection from '../components/CardSection'
import Input from '../components/Input'
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
import {styles as s} from "react-native-style-tachyons";

import genres from '../jsons/genres.json'

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

const CIFRACLUB_API_URL = 'https://20a4a644.ngrok.io'

class NewSongScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      searchResult: [],
      selectedSong: null,
      hideInputs: true,
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
    this.setState({ search, loading: true, hideInputs: true })

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

  onGenreSelected(selectedGenre) {
    this.setState({ selectedGenre })
  }

  onHarmonicSelect() {
    this.setState({ harmonic: !this.state.harmonic })
  }

  onMelodicSelect() {
    this.setState({ melodic: !this.state.melodic })
  }

  selectSong = selectedSong => {
    this.setState({ hideInputs: true })
    this.setState({ selectedSong })
  }

  render() {
    const {
      loading,
      searchResult,
      hideInputs,
      name,
      artist,
      selectedGenre,
      search,
      melodic,
      harmonic,
      selectedSong,
    } = this.state
    const { navigation } = this.props
    return (
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

          <Card>
            {!!search && (
              <SelectableSongList
                songs={searchResult}
                onSelect={this.selectSong}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                this.setState({ hideInputs: false, search: '' })
                this.searchSong.bind(this)
              }}
            >
              <Text >Não encontrei</Text>
            </TouchableOpacity>
          </Card>

          {!hideInputs && (
            <Card>
              <CardSection>
                <Input
                  label="Nome"
                  placeholder="Digite o nome da música"
                  onChangeText={name => this.setState({ name })}
                  value={name}
                />
              </CardSection>

              <CardSection>
                <Input
                  label="Artista"
                  placeholder="Digite o nome do artistaA"
                  onChangeText={artist => this.setState({ artist })}
                  value={artist}
                />
              </CardSection>

              <CardSection>
                <Text style={styles.labelStyle}>Gênero</Text>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{
                    backgroundColor: '#FFFFFF',
                    marginTop: -6,
                    marginBottom: -5,
                  }}
                  placeholder="Selecione um gênero"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
                  selectedValue={selectedGenre}
                  onValueChange={this.onGenreSelected.bind(this)}
                >
                  {this.renderPickerItems(genres)}
                </Picker>
              </CardSection>

              <CardSection>
                <CheckBox
                  checked={melodic}
                  style={styles.checkBoxStyle}
                  onPress={this.onMelodicSelect.bind(this)}
                />
                <Body>
                  <Text>Melódico</Text>
                </Body>
                <CheckBox
                  checked={harmonic}
                  style={styles.checkBoxStyle}
                  onPress={this.onHarmonicSelect.bind(this)}
                />
                <Body>
                  <Text>Harmonico</Text>
                </Body>
              </CardSection>
            </Card>
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
    )
  }
}

export default NewSongScreen
