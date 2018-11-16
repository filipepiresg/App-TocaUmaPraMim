import React, { Component } from 'react'
import { styles as s } from 'react-native-style-tachyons'
import translate from '../i18n/src/locales'
import { View, ScrollView } from 'react-native'
import Fuse from 'fuse.js'
import { Container, Input, Item } from 'native-base'
import SelectableSongList from './SelectableSongList'

/**
 * Implements a search for songs
 */
class SongListWithSearch extends Component {
  state = {
    searchQuery: null,
    allSongs: [...this.props.songs],
    songs: [...this.props.songs],
  }

  searchOptions = {
    keys: ['name', 'artist', 'genre'],
    threshold: 0.3
  }

  search = searchQuery => {
    this.setState({ searchQuery })
    const { allSongs } = this.state
    const fuse = new Fuse(allSongs, this.searchOptions)
    const songs = fuse.search(searchQuery)
    this.setState({ songs: searchQuery.trim() ? songs : this.state.allSongs })
  }
  render() {
    const { songs, searchQuery } = this.state
    const { loading } = this.props
    return (
      <View>
        <Item style={[s.pv3, s.br3]}>
          <Input
            style={[s.br4, s.pl3, s.bg_white]}
            placeholder={translate('nameOrGenreOrBandSearch')}
            onChangeText={searchQuery => this.search(searchQuery)}
            value={searchQuery}
          />
        </Item>

        <ScrollView style={[s.br3, s.h6]}>
          <SelectableSongList loading={loading} songs={songs} showGenres />
        </ScrollView>
      </View>
    )
  }
}
export default SongListWithSearch
