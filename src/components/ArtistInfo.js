import React from 'react'

import {
  Container,
  Title,
  H1,
  Fab,
  Item,
  Icon,
  Thumbnail,
} from 'native-base'
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import SelectableSongList from './SelectableSongList'
import stylesd from '../stylesd'
import imgDefault from '../img/perfil.png'
import DebouncedInputComponent from './DebouncedInput'
import { styles as s, wrap } from 'react-native-style-tachyons'
import translate from '../i18n/src/locales'
import withUser from './hocs/withUser'

const { width } = Dimensions.get('window')


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
        style={[s.absolute, s.top_0, s.left_0, {
          width,
          height: '100%',
        }]}
      >
        <Image
          style={[s.ass, s.rm_contain, s.top_0, {
            width: '100%',
            height: '100%',
            marginTop: -280,
          }]}
          source={require('../img/bg_profile.png')}
        />
      </View>
      <Container style={[s.flx_i, s.bg_transparent, s.pt4]}>
        <Container style={[s.bg_transparent, s.mb6, s.mt2, s.mh3, s.ph2]}>
          <Container style={[s.bg_white_40, s.br5, s.aic, s.pt2, s.ph3]}>
            <Thumbnail
              source={photoURL ? { uri: photoURL + '?type=large' } : imgDefault}
              large
              style={[s.w4, s.h4, { borderRadius: 60}]}
            />

            <Title style={[s.mt2, s.mb2, s.f4, s.primary]}>{name}</Title>
            <View style={[s.flx_row, s.bg_white_70, s.br2, s.pa2, s.mh3]}>
              <View style={[s.flx_i, s.ph1, s.aic]}>
                <H1>{songsCount}</H1>
                <Text style={[s.tc, s.grey]}>{translate('diferentSongs')}</Text>
              </View>
              <View style={[s.flx_i, s.ph1, s.aic]}>
                <H1>{differentArtists}</H1>
                <Text style={[s.tc, s.grey]}>
                  {translate('diferentArtists')}
                </Text>
              </View>
              <View style={[s.flx_i, s.ph1, s.aic]}>
                <H1>{differentGenres}</H1>
                <Text style={[s.tc, s.grey]}>
                  {translate('diferentGenres')}
                </Text>
              </View>
            </View>
          </Container>

          <Item style={[s.bg_white, s.br3, s.mb3, s.mt3, s.pl2]}>
            <DebouncedInputComponent
              placeholder={translate('nameOrGenreOrBandSearch')}
              updateText={() => {}}
              style={[s.f6]}
            />
          </Item>

          <Container style={[s.br3]}>
            <ScrollView style={[s.br3]}>
              <SelectableSongList loading={false} songs={songs} search={''} showGenres = {true} />
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
            style={[s.bg_primary, {marginRight: -5 }]}
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
