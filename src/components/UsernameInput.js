import React, { Component } from 'react'
import { Input, Label, Item, Icon } from 'native-base'

class UsernameInput extends Component {
  state = {
    value: '',
    loading: true,
    pristine: true,
    valid: true,
  }

  componentDidMount() {
    const { initialValue } = this.props
    if (initialValue) {
      // this.setState({value: initialValue})
    }
  }

  onChangeText = text => {
    this.setState({ value: text })
  }

  renderIcon = () => {
    const { loading, pristine, valid } = this.state
    console.log('called, pristine is ==>', pristine)
    if (pristine) return null
    if (loading) {
      return <Icon active name="dots-three-horizontal" type="Entypo" />
    }
    if (valid) {
      return (
        <Icon active name="check" type="Entypo" style={{ color: 'green' }} />
      )
    } else {
      return <Icon active name="block" type="Entypo" style={{ color: 'red' }} />
    }
  }

  render() {
    const { onChange, label, placeholder } = this.props
    const { value } = this.state

    return (
      <Item floatingLabel>
        <Label>{label || 'Nome de Usuário'}</Label>
        <Input
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={this.onChangeText}
        />
        {this.renderIcon()}
      </Item>
    )
  }
}

export default UsernameInput
