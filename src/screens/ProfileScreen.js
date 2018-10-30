import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import withAuth from '../components/hocs/withAuth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ArtistInfo from '../components/ArtistInfo'

class ProfileScreen extends Component {
  state = {
    username: null,
  }

  subscription = null

  componentDidMount() {
    const didFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.fetchUser
    )
    this.subscription = didFocusSubscription
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  searchSong = search => {
    this.setState({ search })
  }

  fetchUser = async () => {
    this.setState({ username: null })
    const { username } = JSON.parse(await AsyncStorage.getItem('loggedUser'))
    this.setState({ username })
  }

  render() {
    const { username } = this.state

    if (!username) return null

    return <ArtistInfo username={username} hasOptions />
  }
}

export default withAuth(ProfileScreen)
