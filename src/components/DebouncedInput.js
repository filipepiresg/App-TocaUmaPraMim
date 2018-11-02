import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { Input } from 'native-base'

class DebouncedInput extends Component {
  state = {
    text: this.props.text,
  }
  static propTypes = {
    updateText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.string,
  }

  componentDidMount() {
    this.sendTextChange = debounce(this.sendTextChange, 500)
  }

  handleTextChange = text => {
    this.setState({ text })
    this.sendTextChange(text.trim())
  }

  sendTextChange = text => {
    this.props.updateText(text)
  }

  render() {
    return (
      <Input
        style={this.props.style}
        placeholder={this.props.placeholder}
        onChangeText={txt => this.handleTextChange(txt)}
        value={this.state.text}
      />
    )
  }
}

export default DebouncedInput
