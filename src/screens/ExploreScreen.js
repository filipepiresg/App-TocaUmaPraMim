import firebase from "firebase";
import { Container, Content, Header, Icon, Input, Item } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import User from "../components/User";
require("firebase/firestore");

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ""
    };
  }
  
  componentWillMount() {
    this.retrieveDataUsers();
    
  }

  retrieveDataUsers = async () => {
    // const {users} = this.state;
    const dbUsers = await firebase
      .firestore()
      .collection("users")
      .get();
    const users = []
    dbUsers.forEach( user => {
      users.push(user.data())
    })
    this.setState({ users })
  }

  render() {
    const { search, users } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header searchBar rounded transparent>
          <Item style={styles.itemInput}>
            <Icon name="search" />
            <Input
              placeholder="busca por nome e/ou instrumento"
              value={search}
              onChangeText={search => this.setState({ search })}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="name-phone-pad"
            />
          </Item>
        </Header>

        <Content contentContainerStyle={styles.content}>
          { 
            users.map( user => (
              <User key={user.username} user={user} navigation={navigation} />
            ))
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,239,215)"
  },
  itemInput: {
    backgroundColor: "#fff"
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
