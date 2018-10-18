import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { List, ListItem, Body, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { styles as s } from 'react-native-style-tachyons'

/**
 * Exports an List component that shows an array of songs
 * and allows the use to select one of them
 */
class SelectableSongList extends Component {
  static proptypes = {
    songs: PropTypes.array.isRequired,
    onSelect: PropTypes.array,
    loading: PropTypes.boolean,
  }

  state = {
    selectedSong: null,
  }

  renderLogin = () => {
    return (
      <View style={[s.pa3]}>
        <ActivityIndicator size="small" color="#ccc" />
      </View>
    )
  }

  /**
   * Stores the selected song to the state and call the return function
   */
  selectSong = song => {
    this.setState({ selectedSong: song })
    this.props.onSelect && this.props.onSelect(song)
  }

  render() {
    const { songs, loading } = this.props
    const { selectedSong } = this.state

    return (
      <List style={{ backgroundColor: 'white' }}>
        {loading && this.renderLogin()}
        {(!loading && songs) &&
          songs
            .map((a, index, that) => ({
              ...a,
              last: index + 1 === that.length,
            }))
            .map(song => (
              <ListItem
                onPress={() => this.selectSong(song)}
                key={`${song.artist.slug}${song.slug}`}
                style={[song.last && { borderColor: 'white' }]}
                noIndent
                selected={_.isEqual(song, selectedSong)}
              >
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>{song.name}</Text>
                  <Text note>{song.artist.name ? song.artist.name : song.artist}</Text>
                </Body>
              </ListItem>
            ))}
      </List>
    )
  }
}

export default SelectableSongList
