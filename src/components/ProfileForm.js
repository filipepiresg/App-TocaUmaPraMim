import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import {styles as s} from "react-native-style-tachyons"

import UsernameInput from './UsernameInput'
import StateCityInput from './StateCityInput'

import { Form, Item, Label, Input } from 'native-base'

const styles = StyleSheet.create({})

class ProfileForm extends Component {
  static propTypes = {
    initialUser: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    initialUser: null,
  }

  componentDidMount() {
    const { initialUser } = this.props
    this.setState({ initialUser })
  }

  handleNameChange(name) {
    this.setState({ name }, () => this.props.onChange(this.state))
  }

  handleUsernameChange(username) {
    this.setState({ username }, () => this.props.onChange(this.state))
  }

  setLocation(location) {
    this.setState({ stateCode: location.stateCode, city: location.city }, () =>
      this.props.onChange(this.state)
    )
  }

  render() {
    const { name, username, stateCode, city } = this.state.user || {}

    return (
      <Form>
        <Item floatingLabel>
          <Label>Nome</Label>
          <Input
            onChangeText={name => this.handleNameChange(name)}
            value={name}
          />
        </Item>
        <UsernameInput
          username={username}
          onChange={username => this.handleUsernameChange(username)}
        />
        <StateCityInput
          style={[s.mt2]}
          stateCode={stateCode}
          city={city}
          onChange={location => this.setLocation(location)}
        />
      </Form>
    )
  }
}

export default ProfileForm