import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import UsernameInput from './UsernameInput';
import StateCityInput from './StateCityInput';

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
        this.state = {...this.props.user};
    }    

    handleNameChange (name) {
      this.setState({ name }, ()=> this.props.onChange(this.state));
    }
    
    handleUsernameChange (username){
      this.setState({ username}, ()=> this.props.onChange(this.state));
    }

    setLocation (location){
      this.setState({stateCode: location.stateCode, city: location.city}, ()=> this.props.onChange(this.state));
    }

    render() {
        const { name, username, stateCode, city } = this.state

        return (
          <Form>
            <Item floatingLabel>
              <Label>Cidade</Label>
              <Input
                onChangeText={name => this.handleNameChange(name)}
                value={name}
              />
            </Item>
            <UsernameInput
              username={username}
              onChange={username => this.handleUsernameChange(username)}
            />
            <StateCityInput stateCode={stateCode} city={city} onChange={location => this.setLocation(location) }/>
          </Form>
        
        )
      }
}