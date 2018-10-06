import React, { Component } from 'react'
import { StyleSheet, Dimensions} from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Svg } from 'expo'
import { styles as s } from 'react-native-style-tachyons'

import { Container, Content, Icon, Input, Item, Spinner, View } from 'native-base'

import stylesd from '../stylesd'
import User from '../components/User'

const { width, height } = Dimensions.get("window");

class ExploreScreen extends Component {
  renderLoader = () => {
    const cardWidth = width / 2 - 20
    const cardHeight = 160

    return (
      <View style={[s.pa2]}>
        <SvgAnimatedLinearGradient
          width={width}
          height={400}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          {[0,1,2,3,4,5].map(i => (<Svg.Rect
            key={i}
            x={i % 2 ? 5 : cardWidth + 10}
            y={i % 2 ? i * cardHeight + 5 : (i-1) * cardHeight + 10}
            rx="0"
            ry="0"
            width={cardWidth}
            height={cardHeight}
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

    return (
      <Container style={styles.container}>
        <Item style={styles.itemInput} rounded>
          <Icon name="search" />
          <Input
            value={search}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            placeholder="busca por nome e/ou inst    rumento"
            onChangeText={text => this.setState({ search: text })}
          />
        </Item>
        <Content contentContainerStyle={styles.content}>
          {true && this.renderLoader()}
          {false &&
            users.map(user => (
              <User key={user.username} user={user} navigation={navigation} />
            ))}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo,
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
})

export default ExploreScreen
