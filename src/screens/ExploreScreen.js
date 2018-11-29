import React, { Component } from 'react'
import { StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Svg } from 'expo'
import { styles as s } from 'react-native-style-tachyons'

import { Container, Content, Icon, Input, Item,  Button, View, Text, ListItem, Body, H3 } from 'native-base'

import stylesd from '../stylesd'
import User from '../components/User'
import translate from '../i18n/src/locales';

const { width, height } = Dimensions.get("window");

class ExploreScreen extends Component {
  renderLoader = () => {
    const cardWidth = width / 2 - 34
    const cardHeight = 160

    return (
      <View style={[s.pa2, s.pl3]}>
        <SvgAnimatedLinearGradient
          width={width}
          height={400}
          primaryColor="#f3f3f3"
          secondaryColor="#ffefd7"
        >
          {[0,1,2,3,4,5].map(i => (<Svg.Rect
            key={i}
            x={i % 2 == 0 ? 5 : cardWidth + 25}
            y={Math.floor(i/2) * cardHeight + 40}
            rx="0"
            ry="0"
            width={cardWidth}
            height={140}
          />))}
          
        </SvgAnimatedLinearGradient>
      </View>
    )
  }
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      search: '',
      loading: false,
    }
  }

  componentDidMount() {
    this.retrieveDataUsers()
  }

  retrieveDataUsers = async () => {
    this.setState({ loading: true })
    const db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    const dbUsers = await db.collection('users').get()
    const users = []
    dbUsers.forEach(user => {
      users.push(user.data())
    })
    this.setState({ users, loading: false })
  }

  render() {
    const { search, users, loading } = this.state
    const { navigation } = this.props
    const section = false;
    return (
      <Container style={styles.container}>
        <Content style={styles.subcontainer}>
        <Text style={styles.title}>Seções</Text>
        <Content contentContainerStyle={styles.section} scrollEnabled={false}>
          { section ? (
          <ListItem style= {styles.sectionStyle} underlayColor={"#000"}   onPress={() => navigation.navigate("Profile")} icon>
            <Icon active name="md-microphone" style={{ backgroundColor: s.primary.color, marginLeft:10 }} />
            <Body style={{ alignItems:'center'}}>
              <Text>Secao 1</Text>
            </Body>
          </ListItem>
          ): (
          <View style = {styles.addSectionStyle}>
            <Text style = {styles.warningText} >Não existe seção cadastrada.*</Text>
            <Button
              block

              style={styles.addButton}
              onPress={() => navigation.navigate("Section")}
            >
              <Text style={styles.buttonText}>Crie uma seção!</Text>
            </Button>
          </View>
          )}
        </Content>
        <View style={{borderTopWidth: 1,borderStyle:'solid', marginTop:5}}>
          <Text style={styles.title}>Explorer</Text>
            <Item style={styles.itemInput} rounded>
              <Icon name="search" />
              <Input
                value={search}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                placeholder={translate("nameOrInstrumentSearch")}
                onChangeText={text => this.setState({ search: text })}
              />
            </Item>
            <Content contentContainerStyle={styles.content}>
              {loading && this.renderLoader()}
              {!loading &&
                users.map(user => {
                  if(user && user.name.toLowerCase().includes(search.toLowerCase())
                    // busca pelos instrumentos do usuario
                    // || user.instruments.contains(search.toLowerCase()) 
                  ){
                    return (
                      <User key={user.username} user={user} navigation={navigation} />
                    )
                  }
                })
              }
            </Content>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo,
    paddingTop: (Platform.OS) ? 20 : 0
  },
  subcontainer: {
    marginTop: 20
  },
  itemInput: {
    backgroundColor: '#fff',
  },
  content: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
  },
  title:{
    fontSize: 24,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  section:{
    alignItems: 'center'
  },
  addSectionStyle:{
    alignItems:'center',
    width: '90%'
  },
  addButton: {
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: stylesd.segundaCor
  },
  sectionStyle:{ 
    backgroundColor: "#ccc",
    alignItems:'center',
    width: '90%',
    marginRight:10
  },
  buttonText:{
    textAlign:'center'
  },
  warningText:{
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12
  }
})

export default ExploreScreen
