import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker, Icon } from 'native-base'
import translate from '../i18n/src/locales'

const styles = StyleSheet.create({
  viewPadding: {
    marginLeft: 7
  },
  labelStyle: {
    marginLeft: 6.5, 
    marginTop: 10,
    color: "gray"
  }
})

const GenreSelect = ({ selectedGenre, genres, onChange }) => {
    return (
      <View style={styles.viewPadding}>

        <Text style={styles.labelStyle}>
          {translate("selectGenre")}
        </Text>
        
        <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder={translate("selectGenre")}
            placeholderStyle={{ color: "#777" }}
            placeholderIconColor="#777"
            selectedValue={selectedGenre}
            onValueChange={(value) => onChange(value)}
            pickerStyle ={{ color: "black", placeholderTextColor:"gray" }}
          >
            {genres}
        </Picker>
      </View>
    )
  }

export default GenreSelect;