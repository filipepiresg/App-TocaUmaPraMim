import React, { Component } from 'react'
import { View } from 'react-native'
import { Input } from 'native-base'

class UsernameInput extends Component {
  render() {

    return (
      <View>
        <Input
          placeholder="digite o usuário"
          autoCapitalize="none"
          autoCorrect={false}
          value={''}
          onChangeText={''}
        />
      </View>
    )
  }
}

export default UsernameInput
