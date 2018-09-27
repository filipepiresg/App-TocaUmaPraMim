import firebase from "firebase";
import React, { Component } from "react";
import { Container, Content, Header, Icon, Input, Item, Spinner } from "native-base";
import { StyleSheet } from "react-native";
require("firebase/firestore");

import User from "../components/User";
import withLoading from '../components/hocs/withLoading';

class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ""
    };
  }
  
  componentDidMount() {
    this.retrieveDataUsers();
    
  }

  retrieveDataUsers = async () => {
    const {  showLoading, hideLoading } = this.props;
    showLoading();

    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    const dbUsers = await db
      .collection("users")
      .get();
    const users = [];
    dbUsers.forEach( user => {
      users.push(user.data());
    })
    this.setState({ users });

    hideLoading();
  }

  render() {
    const { search, users } = this.state;
    const { navigation, loading } = this.props;
    const content = ( loading ) 
      ? <Spinner style={{flex:1, alignItems:'center'}} /> 
      : users.map( user => ( <User key={user.username} user={user} navigation={navigation} /> ))
    return (
      <Container style={styles.container}>
        <Header searchBar rounded transparent>
          <Item style={styles.itemInput}>
            <Icon name="search" />
            <Input
              placeholder="busca por nome e/ou instrumento"
              value={search}
              onChangeText={text => this.setState({ search:text })}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="name-phone-pad"
            />
          </Item>
        </Header>

        <Content contentContainerStyle={styles.content}>
          { 
            content
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

export default withLoading(ExploreScreen);
