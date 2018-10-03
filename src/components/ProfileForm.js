import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import UsernameInput from './UsernameInput';

import {
  Container,
  Button,
  Content,
  Header,
  Form,
  Item,
  Label,
  Input
} from 'native-base'



const styles = StyleSheet.create({
  dropdownContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  dropdownStyle: {
    width: '50%',
  },
})


export default class ProfileForm extends Component {
  constructor (props) {
      super(props);
  }

  state = {...this.props.user};

  onChangeText = (user) => {
      this.setState(user);
      const { onChange } = this.props;
      onChange(this.state);
  }
  
  render() {
    const { name, username, stateCode, city } = this.state
    return (
      <Form>
        <Item floatingLabel>
          <Label>Nome</Label>
          <Input
            value={name}
            onChangeText={ name => this.onChangeText({ name }) }
          />
        </Item>
        <UsernameInput
          onChange={txt => this.onChangeText({ username: txt })}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '20%'}}>
            <Item floatingLabel>
              <Label>UF</Label>
              <Input
                value={stateCode}
                autoCapitalize='characters'
                onChangeText={ txt => this.onChangeText({ stateCode: txt.toUpperCase()  })}
              />
            </Item>
          </View>
          <View style={{width: '80%'}}>
            <Item floatingLabel>
              <Label>Cidade</Label>
              <Input
                value={city}
                autoCapitalize='words'
                keyboardType='name-phone-pad'
                onChangeText={city => this.onChangeText({ city })}
              />
            </Item>
          </View>
        </View>
      </Form>
    )
  }
}