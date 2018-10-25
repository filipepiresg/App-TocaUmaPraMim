import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'
import translate from '../i18n/src/locales'

const SongModeToggler = ({ showSongForm, pristine, onToggle}) => (
  <TouchableOpacity
    onPress={() => {
        onToggle({showSongForm: !showSongForm})
    }}
  >
    <Text style={[s.tc, s.mt2, s.b]}>
      {!showSongForm ? translate("insertManually") : translate("searchSong")}
    </Text>
  </TouchableOpacity>
)

export default SongModeToggler
