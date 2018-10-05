import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { styles as s } from 'react-native-style-tachyons'

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
    user: null,
  }

  componentDidMount() {
    const { initialUser } = this.props
    this.setState({ user: {...initialUser} })
  }

  getHandlerForUser = field => {
    return value => {
      this.setState(
        { user: { ...this.state.user, [field]: value } },
        this.updateParent
      )
    }
  }

  setLocation = location => {
    this.setState(
      { user: { ...this.state.user, ...location } },
      this.updateParent
    )
  }

  updateParent = () => {
    this.props.onChange(this.state.user)
  }
  render() {
    const { name, username, stateCode, city } = this.state.user || {}

    return (
      <Form>
        <Item floatingLabel>
          <Label>Nome</Label>
          <Input onChangeText={this.getHandlerForUser('name')} value={name} />
        </Item>
        <UsernameInput
          username={username}
          onChange={this.getHandlerForUser('username')}
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
