import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { List, ListItem, Body, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { styles as s } from 'react-native-style-tachyons'
import data from '../jsons/genres.json'
import colorsData from '../jsons/genresColors.json'
/**
* Exports an List component that shows an array of songs
* and allows the use to select one of them
*/
class SelectableSongList extends Component {
  static proptypes = {
    songs: PropTypes.array.isRequired,
    isSelectable: PropTypes.boolean,
    onSelect: PropTypes.array,
    loading: PropTypes.boolean,
    search: PropTypes.string
  }
  
  state = {
    selectedSong: null,
  }
  
  renderLoading = () => {
    return (
      <View style={[s.pa3]}>
        <ActivityIndicator size="small" color="#ccc" />
      </View>)
    }

    renderGender = (genre) => {
      let genres = [...data];
      let colors = [...colorsData];
      let a = genres.indexOf(genre);
      if(a == -1) a = genre.length;
      let color = colors[a];
      return (
          <View style={[ s.flx_row, s.jcfe, s.asc, s.ba,s.pa1, { borderColor: color} ]}>
            <Text style={[ s.b,{color: color, fontSize:12}]}>{genre.toUpperCase()}</Text>
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
    const { songs, loading, search = '', isSelectable,showGenres } = this.props
    const { selectedSong } = this.state
    
    return (
      <List style={{ backgroundColor: 'white' }}>
      {loading && this.renderLoading()}
      {
        (!loading && songs) &&
        songs
        .map((a, index, that) => ({
          ...a,
          last: index + 1 === that.length,
        }))
        .map((song, id) => {
          if(song.name.toLowerCase().includes(search.toLowerCase())
            || song.artist.toLowerCase().includes(search.toLowerCase())
            || song.genre.toLowerCase().includes(search.toLowerCase())
          ){
            return (
              <ListItem
                onPress={() => isSelectable && this.selectSong(song)}
                key={id}
                style={[song.last && { borderColor: 'white' }]}
                noIndent
                selected={_.isEqual(song, selectedSong)}
              >
                <Body style={[ s.flx_row,  s.flx_i, s.jcsb ]}>
                  <View style={[ s.aifs, s.w4]}>
                    <Text style={{ fontWeight: 'bold' }}>{song.name}</Text>
                    <Text note>{song.artist.name || song.artist}</Text>
                  </View>
                  {showGenres && song.genre && this.renderGender(song.genre)}
                </Body>
              </ListItem>
              )
            }
          }
        )
      }
      </List>
    )
  }
}
    
export default SelectableSongList
      