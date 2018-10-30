import React, { Component } from 'react'
import I18n from 'react-native-i18n'

/**
 * HOC that loads the user's data asyncronously and add some stats.
 */
export default WrappedComponent => {
  class ComponentWithUser extends Component {
    state = {
      user: null
    }

    /**
     * Counts the number of different values for a specific field
     * in a songs colletion
     */
    getDifferentBy = (songs, field) => {
      if (!songs || !songs.length) return 0
      const reducer = (occrns, song) => ({...occrns, [song[field]]: true})
      return Object.keys(songs.reduce(reducer, {})).length
    }
    
    /**
     * Calculates the number of occurrences of each field to be displayed
     * in the view
     */
    fillUserStats = (user) => {
      const { songs } = user
      const stats = {
        songsCount: songs && songs.length || 0,
        differentArtists: this.getDifferentBy(songs, 'artist'),
        differentGenres: this.getDifferentBy(songs, 'genre') 
      }
      return {...user, stats}
    }

    componentDidMount() {
      const { username } = this.props
      const url =
        'https://us-central1-tupm-app.cloudfunctions.net/getUserFromUsername?username=' +
        username
      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(this.fillUserStats)
        .then(user => {
          I18n.locale = user.language
          this.setState({ user })
        })
        .catch(error => {
          console.error(error)
        })
    }

    render = () =>
      this.state.user && (
        <WrappedComponent {...this.props} user={this.state.user} />
      )
  }
  return ComponentWithUser
}
