import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text, Button } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'

/**
 * Custom Button elemtn for the Toca Uma Pra Mim App
 */
const TupmButtom = ({
  disabled,
  loading = true,
  block = false,
  text,
  onPress,
  style,
}) => (
  <Button
    block={block}
    iconLeft
    style={[
      s.ma1,
      s.aic,
      s.jcc,
      s.flx_i,
      !block && s.w4,
      {
        backgroundColor: disabled ? '#bbb' : 'rgb(72,186,196)',
      },
      ...style,
    ]}
    disabled={disabled}
    onPress={onPress}
  >
    {!loading && <Text style={[s.b, s.white]}>{text}</Text>}
    {loading && <ActivityIndicator size="small" color="#fff" />}
  </Button>
)

export default TupmButtom
