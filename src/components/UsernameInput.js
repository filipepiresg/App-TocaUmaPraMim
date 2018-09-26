import React, { Component } from 'react'
import { Input, Label, Item, Icon } from 'native-base'
import debounce from 'lodash/debounce';

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
      this.setState({value: initialValue})
    }
    this.onChangeText = debounce(this.onChangeText, 1000);
  }

  checkUsername = (username) => {
    // TODO: Replace this with an actual ajax call for our cloud functions
    return new Promise((resolve) =>{
      setTimeout(() => {
        resolve({exists: Math.random() > 0.5})
      }, 300)
    });
  }

  onChangeText = async text => {
    const { onChange } = this.props;
    if (!text) {
      onChange();
      return this.setState({pristine: true, loading: false})  
    }
    this.setState({pristine: false, loading: true})
    const username = text.trim();
    const data = await this.checkUsername(username);
    this.setState({valid: !data.exists, loading: false})
    onChange(!data.exists ? username : null)
  }

  renderIcon = () => {
    const { loading, pristine, valid } = this.state

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
    const { label, placeholder } = this.props
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
