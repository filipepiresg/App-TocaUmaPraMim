import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { styles as s } from 'react-native-style-tachyons'
import {
  View,
  Form,
  Label,
  Item,
  Input,
  CheckBox,
  Textarea,
  Text,
  Picker,
  Icon
} from 'native-base'
import data from '../jsons/genres.json';
class SongForm extends Component {
  static propTypes = {
    initialSong: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    song: null,
  }

  componentDidMount() {
    this.verifyReceivedSong()
  }

  verifyReceivedSong() {
    const { initialSong } = this.props
    if (initialSong) {
      const song = {
        name: initialSong.name,
        artist: initialSong.artist.name,
        metadata: {
          provider: 'cifraclub',
          songSlug: initialSong.slug,
          artistSlug: initialSong.artist.slug,
        },
        genre: initialSong.genre,
        harmonic: true
      }
      
      this.setState({ song }, this.updateParent)
    }
  }

  getHandlerForSong = field => {
    return value => {
      console.log(value);
      this.setState(
        { song: { ...this.state.song, [field]: value } },
        this.updateParent
      )
    }
  }

  getTogglerForSong = field => {
    return () => {
      this.setState(
        {
          song: {
            ...this.state.song,
            [field]: this.state.song && !this.state.song[field],
          },
        },
        this.updateParent
      )
    }
  }

  setLocation = location => {
    this.setState(
      { song: { ...this.state.song, ...location } },
      this.updateParent
    )
  }

  loadGenres() {
    let genres = [...data];
    if(!genres.includes(this.state.genre)) genres.push(this.state.genre)
    return genres.map(genre => (
      <Picker.Item
        label={genre}
        key={genre}
        value={genre}
      />
    ))
  }

  updateParent = () => {
    this.props.onChange(this.state.song)
  }

  render() {
    const { song } = this.state

    const { name, artist, melodic, harmonic, metadata, genre } = song || {}
    
    return (
      <Form>
        <Item floatingLabel>
          <Label>Música</Label>
          <Input
            disabled={!!metadata}
            onChangeText={this.getHandlerForSong('name')}
            value={name}
          />
        </Item>
        <Item floatingLabel>
          <Label>Artista</Label>
          <Input
            disabled={!!metadata}
            onChangeText={this.getHandlerForSong('artist')}
            value={artist}
          />
        </Item>

        <View style={[s.flx_i, s.jcsb, s.flx_row, s.mt4, s.mb3]}>
          <View style={[{ width: '30%' }, s.flx_i, s.flx_row]}>
            <CheckBox
              checked={melodic}
              style={[s.mr3, s.ml1]}
              onPress={this.getTogglerForSong('melodic')}
            />
            <Text>Melódico</Text>
          </View>
          <View style={[{ width: '30%' }, s.flx_i, s.flx_row]}>
            <CheckBox
              checked={harmonic}
              style={[s.mr3, s.ml1]}
              onPress={this.getTogglerForSong('harmonic')}
            />
            <Text>Harmônico</Text>
          </View>
          <View style={[{ width: '40%' }, s.flx_i, s.flx_row]}>
          <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="Selecione um estilo musical"
              placeholderStyle={{ color: "#777" }}
              placeholderIconColor="#777"
              selectedValue={genre}
              onValueChange={this.getHandlerForSong('genre')}
            >
              {this.loadGenres()}
            </Picker>
          </View>
        </View>

        <Label style={[s.ml3, {fontSize: 15, color: '#777', marginBottom: -5}]}>Informações</Label>
        <Textarea
          rowSpan={5}
          style={[s.mt3, s.mr3, s.ml3]}
          onChangeText={this.getHandlerForSong('info')}
          bordered
          placeholder="ex: Tom Original C"
        />
      </Form>
    )
  }
}

export default SongForm
