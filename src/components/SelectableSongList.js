import React, { Component } from "react";
import { ActivityIndicator, ListView, Alert } from "react-native";
import {
  List,
  ListItem,
  Body,
  Text,
  View,
  Button,
  Icon,
  Toast
} from "native-base";
import PropTypes from "prop-types";
import _ from "lodash";
import { styles as s } from "react-native-style-tachyons";
import data from "../jsons/genres.json";
import colorsData from "../jsons/genresColors.json";
import * as firebase from "firebase";
import translate from "../i18n/src/locales";
require("firebase/firestore");

/**
 * Exports an List component that shows an array of songs
 * and allows the use to select one of them
 */
class SelectableSongList extends Component {
  static proptypes = {
    songs: PropTypes.array.isRequired,
    isSelectable: PropTypes.boolean,
    onSelect: PropTypes.array,
    loading: PropTypes.boolean
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      selectedSong: null
    };
  }

  renderLoading = () => {
    return (
      <View style={[s.pa3]}>
        <ActivityIndicator size="small" color="#ccc" />
      </View>
    );
  };

  renderGender = genre => {
    let genres = [...data];
    let colors = [...colorsData];
    let a = genres.indexOf(genre);
    if (a == -1) a = genre.length;
    let color = colors[a];
    return (
      <View
        style={[s.flx_row, s.jcfe, s.asc, s.ba, s.pa1, { borderColor: color }]}
      >
        <Text style={[s.b, { color, fontSize: 12 }]}>
          {genre.toUpperCase()}
        </Text>
      </View>
    );
  };

  /**
   * Stores the selected song to the state and call the return function
   */
  selectSong = song => {
    this.setState({ selectedSong: song });
    this.props.onSelect && this.props.onSelect(song);
  };

  deleteSong = async song => {
    await firebase
      .firestore()
      .collection("songs")
      .doc(song.id)
      .delete()
      .then(() => {
        Toast.show({
          text: translate("songDeleted"),
          type: "success"
        });
      });
  };

  askSong = async ({ name, userId }) => {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(userId);

    userRef.get().then(user => {
      if (user.exists) {
        const { requestedSongs = [] } = user.data();
        userRef
          .set(
            {
              requestedSongs: [...requestedSongs, name]
            },
            { merge: true }
          )
          .then(() => {
            Toast.show({
              text: translate("songRequest"),
              type: "success"
            });
          });
      }
    });
  };

  renderRow = song => {
    const { isSelectable, showGenres } = this.props;
    return (
      <ListItem
        onPress={() => isSelectable && this.selectSong(song)}
        key={song.songSlug + song.artistSlug}
        style={[song.last && { borderColor: "white" }]}
        noIndent
        selected={_.isEqual(song, this.state.selectedSong)}
      >
        <Body style={[s.flx_row, s.flx_i, s.jcsb]}>
          <View style={[s.aifs, s.w4]}>
            <Text style={{ fontWeight: "bold" }}>{song.name}</Text>
            <Text note>{song.artist.name || song.artist}</Text>
          </View>
          {showGenres && song.genre && this.renderGender(song.genre)}
        </Body>
      </ListItem>
    );
  };

  renderRowButton = rowId => {
    return (
      <Button full danger onPress={() => this.deleteSong(rowId)}>
        <Icon active name="trash" />
      </Button>
    );
  };

  renderRowButtonLeft = data => {
    return (
      <Button full success onPress={() => this.askSong(data)}>
        <Icon active name="add" />
      </Button>
    );
  };

  render() {
    const { songs, loading, isHiddenDelete, isHiddenAdd } = this.props;

    return (
      <List
        style={{ backgroundColor: "white" }}
        dataSource={this.ds.cloneWithRows(songs)}
        disableLeftSwipe={!isHiddenDelete}
        disableRightSwipe={isHiddenAdd}
        renderRow={data => this.renderRow(data)}
        renderLeftHiddenRow={data => this.renderRowButtonLeft(data)}
        renderRightHiddenRow={data => this.renderRowButton(data)}
        rightOpenValue={-75}
        leftOpenValue={75}
      >
        {loading && this.renderLoading()}
      </List>
    );
  }
}

export default SelectableSongList;
