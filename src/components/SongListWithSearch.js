import React, { Component } from "react";
import { styles as s } from "react-native-style-tachyons";
import translate from "../i18n/src/locales";
import { View, ScrollView, Dimensions } from "react-native";
import Fuse from "fuse.js";
import { Container, Input, Item } from "native-base";
import SelectableSongList from "./SelectableSongList";

const { height, width } = Dimensions.get("window");

/**
 * Implements a search for songs
 */
class SongListWithSearch extends Component {
  state = {
    searchQuery: "",
    allSongs: [...this.props.songs],
    songs: [...this.props.songs]
  };

  searchOptions = {
    keys: ["name", "artist", "genre"],
    threshold: 0.3
  };

  search = searchQuery => {
    this.setState({ searchQuery });
    const { allSongs } = this.state;
    const fuse = new Fuse(allSongs, this.searchOptions);
    const songs = fuse.search(searchQuery);
    this.setState({ songs: searchQuery.trim() ? songs : this.state.allSongs });
  };

  updateSongs = async () => {
    const url =
      "https://us-central1-tupm-app.cloudfunctions.net/getUserFromUsername?username=" +
      this.props.username
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(this.fillUserStats)
      .then(user => {
        this.setState({ songs: user.songs })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { songs, searchQuery } = this.state;
    const { loading, canRequestMusic, canDeleteSong, username } = this.props;
    return (
      <View>
        <Item style={[s.pv3, s.br3]}>
          <Input
            style={[s.br4, s.pl3, s.bg_white]}
            placeholder={translate("nameOrGenreOrBandSearch")}
            onChangeText={searchQuery => this.search(searchQuery)}
            value={searchQuery}
          />
        </Item>

        <ScrollView style={{ height: height - 430 }}>
          <SelectableSongList
            loading={loading}
            username={username}
            updateSongs={this.updateSongs}
            songs={songs}
            showGenres
            search={searchQuery}
            isHiddenAdd={canRequestMusic}
            isHiddenDelete={canDeleteSong}
          />
        </ScrollView>
      </View>
    );
  }
}
export default SongListWithSearch;
