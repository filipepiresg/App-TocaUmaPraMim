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

    return (
      <Container style={styles.container}>
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
