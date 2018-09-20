import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import Footer from '../components/Footer'
import Card from '../components/Card'
import CardSection from '../components/CardSection'

import {
  Container,
  Button,
  Content,
  Header,
  Form,
  Item,
  Label,
  Input,
  Textarea
} from 'native-base'
import { Dropdown } from 'react-native-material-dropdown'

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 20,
  },
  buttonStyle: {
    backgroundColor: 'rgb(72,186,196)',
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 25,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'rgb(255,239,215)',
  },
  dropdownContainerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  dropdownStyle: {
    width: '50%',
  },
})


export default class MusicRegistrationScreen extends Component {
  state = {
    name: '',
    username: '',
    stateCode: '',
    city: ''
  }

  saveInfo() {
    console.log(this.state)
  }

  render() {
    const { name, username, stateCode, city } = this.state

    return (
      <Container style={styles.container}>
        <Content padder>
          <Header transparent />
          <Text style={styles.title}>Só mais um pouco...</Text>
          <Form>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={username => this.setState({ username })}
                value={username}
              />
            </Item>
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
            
            <Button
              block
              iconLeft
              style={styles.buttonStyle}
              onPress={() => this.saveInfo()}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
