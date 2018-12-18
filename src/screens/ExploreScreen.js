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
      sections:[]
    }
  }

  componentDidMount() {
    this.retrieveDataUsers();
    this.retrieveUserSections();
  }

  retrieveUserSections = async () =>{
    const db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })
    firebase.auth().onAuthStateChanged( async currentUser => {
      const dbSections = await db.collection('sections').where("uid", "==", currentUser.uid).get();
      console.log("chamou");
      const sections = []
      dbSections.forEach(section => {
        sections.push({...section.data(),id:section.id})
      })
      console.log(sections);
      this.setState({ sections})
    })
   
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

  renderSections(sections){
    return sections.map((section,i)=>{return (
      <ListItem key={i} style= {styles.sectionStyle} underlayColor={"#000"}   onPress={() => this.props.navigation.navigate("Section",{section,retrieveUserSections: this.retrieveUserSections()})} icon>
        <Icon active name="md-microphone" style={{ backgroundColor: s.primary.color, marginLeft:10 }} />
        <Body style={{ alignItems:'center'}}>
          <Text>{section.name}</Text>
        </Body>
      </ListItem>
    )})
  }

  render() {
    const { search, users, loading, sections } = this.state
    const { navigation } = this.props
    return (
      <Container style={styles.container}>
        <Content style={styles.subcontainer}>
        <Text style={styles.title}>Seções</Text>
        <View contentContainerStyle={styles.section} scrollEnabled={false}>
          { sections != [] ? (
            this.renderSections(sections)
          ) : (
          <View style = {styles.addSectionStyle}>
            <Text style = {styles.warningText} >Não existem seções cadastrada.*</Text>
          </View>
          )}
          <View style = {styles.addSectionStyle}>
            <Button
              block

              style={styles.addButton}
              onPress={() => navigation.navigate("Section")}
            >
              <Text style={styles.buttonText}>Crie uma seção!</Text>
            </Button>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  addSectionStyle:{
    alignItems:'center',
    width: '90%',
    justifyContent: 'center'
  },
  addButton: {
    marginBottom: 10,
    borderRadius: 10,
    marginLeft:18,
    width: '100%',
    backgroundColor: stylesd.segundaCor
  },
  sectionStyle:{ 
    backgroundColor: "#ccc",
    alignItems:'center',
    justifyContent:'center',
    width: '90%',
    marginRight:10,
    marginBottom:10
  },
  buttonText:{
    textAlign:'center',
    fontWeight: 'bold',
  },
  warningText:{
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12
  }
})

export default ExploreScreen
