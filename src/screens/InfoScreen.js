import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {auth} from 'firebase';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.props.navigation.navigate("Login");
    });
  }
  render() {
    return (
      <View>
        <Text>InfoScreen</Text>
        <button onClick={this.logout}>Logout</button> 
      </View>
    );
  }
}
