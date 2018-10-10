import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Item, Label, Input, Picker } from 'native-base'
import {styles as s} from "react-native-style-tachyons";

const styles = StyleSheet.create({
  picker:{
    color: '#000000'
  }

})


class StateCityInput extends Component {
  state = {
    stateCode: this.props.stateCode,
    stateCodeSelected: '',
    city: this.props.city,
    states: [],
    cities: [],
    isLoading: true,
  }

  componentDidMount() {
    return fetch('http://www.geonames.org/childrenJSON?geonameId=3469034')
      .then(response => response.json())
      .then(responseJson => {
        const states = responseJson.geonames
        this.setState({
          isLoading: false,
          states: states,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  loadStates() {
    return this.state.states.map(state => (
      <Picker.Item
        label={state.adminCodes1.ISO3166_2}
        key={state.geonameId}
        value={state}
      />
    ))
  }

  loadCities() {
    return this.state.cities.map(city => (
      <Picker.Item
        label={city.toponymName}
        key={city.geonameId}
        value={city.toponymName}
      />
    ))
  }

  handleStateCodeChange(itemValue) {
    this.setState({ stateCodeSelected: itemValue })
    this.setState(
      { stateCode: itemValue.adminCodes1.ISO3166_2, city: null }
    )
    return fetch(
      'http://www.geonames.org/childrenJSON?geonameId=' + itemValue.geonameId
    )
      .then(response => response.json())
      .then(responseJson => {
        const cities = responseJson.geonames
        this.setState({
          cities: cities,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  handleCityChange(city) {
    const { stateCode } = this.state;
    this.setState({ city }, () => this.props.onChange({city, stateCode}))
  }

  render() {
    const { stateCode, city, stateCodeSelected, citySelected } = this.state
    const { input } = styles;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={[s.mt3, s.aic, s.flx_row, s.flx_i ]}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Picker
            placeholder="UF"
            mode="dropdown"
            selectedValue={stateCodeSelected}
            onValueChange={itemValue => this.handleStateCodeChange(itemValue)}
            pickerStyle ={{ color: "black", placeholderTextColor:"gray" }}
          >
            {this.loadStates()}
          </Picker>
        </View>
        <View
          style={{
            flex: 2,
          }}
        >
          <Picker
            placeholder="Cidade"
            mode="dropdown"
            enabled={stateCodeSelected}
            selectedValue={city}
            onValueChange={itemValue => this.handleCityChange(itemValue)}
            pickerStyle ={{ color: "black", placeholderTextColor:"gray" }}

          >
            {this.loadCities()}
          </Picker>
        </View>
      </View>
    )
  }
}

export default StateCityInput;