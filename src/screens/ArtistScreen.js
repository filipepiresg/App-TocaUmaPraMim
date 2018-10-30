import React, { Component } from 'react'

import ArtistInfo from '../components/ArtistInfo'

/**
 * Shows the data for a specifid user (artist).
 * 
 * Receives an username via navigation props
 */
export default class ArtistScreen extends Component {
  state = {
    username: null,
  }

  componentDidMount() {
    const { navigation } = this.props
    this.setState({username: navigation.getParam('username', null)})
  }

  render() {
    const { username } = this.state;
    if (!username) return null
    return <ArtistInfo username={username} />
  }
}
