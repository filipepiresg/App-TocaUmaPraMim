import React, { Component } from "react"
import * as firebase from "firebase"
import {
  ListView,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from "react-native"
import { ListItem, Body, Text, View, Content, Title } from "native-base"
import { styles as s } from "react-native-style-tachyons"

import data from "../jsons/genres.json"
import colorsData from "../jsons/genresColors.json"
import translate from "../i18n/src/locales"

export default class OrderScreen extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      songs: null,
      refreshing: false
    }

    this.fetchSongs()
  }

  fetchSongs = () => {
    this.setState({ refreshing: true })

    const firestore = firebase.firestore()
    firestore.settings({ timestampsInSnapshots: true })

    const uid = "IMc2zC7J92WuCe4LfLW1IJK89oN2"
    const usersRef = firestore.collection("users")

    firebase.auth().onAuthStateChanged(currentUser => {
      usersRef
        // .where("authId", "==", uid)
        .where("authId", "==", currentUser.uid)
        .get()
        .then(user => {
          const { requestedSongs = [] } = user.docs[0].data()
          this.setState({ songs: requestedSongs, refreshing: false })
        })
        .catch(err => {
          console.error(err)
        })
    })
  }

  renderGender = genre => {
    let genres = [...data]
    let colors = [...colorsData]
    let a = genres.indexOf(genre)
    if (a == -1) a = genre.length
    let color = colors[a]
    return (
      <View
        style={[s.flx_row, s.jcfe, s.asc, s.ba, s.pa1, { borderColor: color }]}
      >
        <Text style={[s.b, { color, fontSize: 12 }]}>
          {genre.toUpperCase()}
        </Text>
      </View>
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "94%",
          backgroundColor: "#999",
          alignSelf: "center"
        }}
      />
    )
  }

  renderItem = item => {
    return (
      <ListItem noBorder>
        <Body style={[s.flx_row, s.flx_i, s.jcsb]}>
          <View style={[s.aifs, s.w4]}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text note>{item.artist.name || item.artist}</Text>
          </View>
          {item.genre && this.renderGender(item.genre)}
        </Body>
      </ListItem>
    )
  }

  render() {
    const { songs } = this.state
    return (
      <SafeAreaView style={[s.flx_i, s.bg_secondary]}>
        {songs === null ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={songs}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: "center" }}>
                {translate("nothingOrder")}
              </Text>
            )}
            refreshing={this.state.refreshing}
            onRefresh={this.fetchSongs}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={() => (
              <Title style={{ fontSize: 20 }}>
                {translate("order").toUpperCase()}
              </Title>
            )}
          />
        )}
      </SafeAreaView>
    )
  }
}
