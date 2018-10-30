import React, { Component } from 'react'

import {
  Container,
  Title,
  Subtitle,
  H1,
  Fab,
  Item,
  Icon,
  Button,
  Thumbnail,
} from 'native-base'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  AsyncStorage,
  ScrollView,
  Platform,
  Image,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import SelectableSongList from './SelectableSongList'
import stylesd from '../stylesd'
import imgDefault from '../img/perfil.png'
import DebouncedInputComponent from './DebouncedInput'
import { styles as s, wrap } from 'react-native-style-tachyons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import translate from '../i18n/src/locales'
import I18n from 'react-native-i18n'
import withUser from './hocs/withUser'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: stylesd.corDeFundo,
    paddingTop: Platform.OS ? 40 : 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'transparent',
  },
  inputSearch: {
    fontSize: 14,
  },
  subContainer: {
    marginHorizontal: 30,
    marginBottom: 130,
    backgroundColor: 'transparent',
  },
  typeInfo: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  containerInfo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 10,
  },
  imgPerfil: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  containerPerfil: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: (width * 0.3) / 2,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  txtInfo: {
    textAlign: 'center',
    color: '#ccc',
    flexWrap: 'wrap',
  },
})

const ArtistInfo = ({ user, hasOptions, navigation}) => {
  if (!user) return null
  const { name, photoURL, songs, stats } = user
  const { songsCount, differentArtists, differentGenres } = stats

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: stylesd.corDeFundo,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: '100%',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'stretch',
            resizeMode: 'contain',
            marginTop: -280,
            top: 0,
          }}
          source={require('../img/bg_profile.png')}
        />
      </View>
      <Container style={styles.container}>
        <Container style={styles.subContainer}>
          <Container style={styles.containerPerfil}>
            <Thumbnail
              source={photoURL ? { uri: photoURL + '?type=large' } : imgDefault}
              large
              style={styles.imgPerfil}
            />

            <Title style={[s.mt2, s.mb2, s.f4, s.primary]}>{name}</Title>
            <View style={styles.containerInfo}>
              <View style={styles.typeInfo}>
                <H1>{songsCount}</H1>
                <Text style={styles.txtInfo}>{translate('diferentSongs')}</Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{differentArtists}</H1>
                <Text style={styles.txtInfo}>
                  {translate('diferentArtists')}
                </Text>
              </View>
              <View style={styles.typeInfo}>
                <H1>{differentGenres}</H1>
                <Text style={styles.txtInfo}>
                  {translate('diferentGenres')}
                </Text>
              </View>
            </View>
          </Container>

          <Item style={[s.bg_white, s.br3, s.mb3, s.mt3, s.pl2]}>
            <DebouncedInputComponent
              placeholder={translate('nameOrGenreOrBandSearch')}
              updateText={() => {}}
              style={styles.inputSearch}
            />
          </Item>

          <Container style={[s.br3]}>
            <ScrollView style={[s.br3]}>
              <SelectableSongList loading={false} songs={songs} search={''} />
            </ScrollView>
          </Container>
        </Container>
        {hasOptions && (
          <Fab
            active={true}
            direction="down"
            containerStyle={{}}
            style={{ backgroundColor: 'red' }}
            position="topRight"
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Icon name="md-create" />
          </Fab>
        )}
        {hasOptions && (
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={[{ backgroundColor: 'rgb(97,197,207)', marginRight: -5 }]}
            position="bottomRight"
            onPress={() => navigation.navigate('NewSong')}
          >
            <Icon name="add" />
          </Fab>
        )}
      </Container>
    </View>
  )
}

export default withNavigation(withUser(ArtistInfo))
