import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Icon } from 'native-base'
import stylesd from '../stylesd';

/**
 * Custom Button element for the Toca Uma Pra Mim App
 */
const SearchButton = ({
  loading,
  onPress,
  style,
}) => {
    if(loading) {
        return (<ActivityIndicator size="small" style={{marginLeft: 10}} color={stylesd.segundaCor} />)
    }
    else {
        return (
            <Icon onPress={onPress}
            style={style}
            type="FontAwesome" 
            name="search" />
        )
    }
}

export default SearchButton
