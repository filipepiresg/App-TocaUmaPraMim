import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from 'native-base'
import translate from '../i18n/src/locales'
import I18n from 'react-native-i18n'

const ENGLISH_LANGUAGE = 'en-US'
const PORTUGUES_LANGUAGE = 'pt-BR'

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

class LanguageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: PORTUGUES_LANGUAGE,
    }
  }

  onLanguageChange = selectedLanguage => {
    this.setState({ selectedLanguage })
    this.props.onChange(selectedLanguage)
  }

  render() {
    const { selectedLanguage } = this.state
    return (
      <View style={styles.viewPadding}>
        <Text style={styles.labelStyle}>
          {translate("defaultLanguage")}
        </Text>
        
        <Picker
          mode="dropdown"
          placeholder="TESTANDO"
          selectedValue={selectedLanguage}
          onValueChange={(language) => this.onLanguageChange(language)}
          pickerStyle ={{ color: "black", placeholderTextColor:"gray" }}
        >
          <Picker.Item
            label={translate("portuguese")}
            key={PORTUGUES_LANGUAGE}
            value={PORTUGUES_LANGUAGE}
          />
          <Picker.Item
            label={translate("english")}
            key={ENGLISH_LANGUAGE}
            value={ENGLISH_LANGUAGE}
          />
        </Picker>
      </View>
    )
  }
}

export default LanguageSelect;