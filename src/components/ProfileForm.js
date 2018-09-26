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

    onChangeText = async text => {
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
                onChangeText={name => this.setState({ name })}
                value={name}
              />
            </Item>
            <UsernameInput
              onChange={username => this.setState({ username })}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '20%'}}>
                <Item floatingLabel>
                  <Label>UF</Label>
                  <Input
                    onChangeText={stateCode => this.setState({ stateCode })}
                    value={stateCode}
                  />
                </Item>
              </View>
              <View style={{width: '80%'}}>
                <Item floatingLabel>
                  <Label>Cidade</Label>
                  <Input
                    onChangeText={city => this.setState({ city })}
                    value={city}
                  />
                </Item>
              </View>
            </View>
          </Form>
        
        )
      }
    }