import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'

const SongModeToggler = ({ showSongForm, pristine, onToggle}) => (
  <TouchableOpacity
    onPress={() => {
        onToggle({showSongForm: !showSongForm})
    }}
  >
    <Text style={[s.tc, s.mt2, s.b]}>
      {!showSongForm ? 'Inserir manualmente' : 'Buscar Música'}
    </Text>
  </TouchableOpacity>
)

export default SongModeToggler
