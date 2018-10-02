import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { Input } from 'native-base';

class DebouncedInputComponent extends Component {

    static propTypes = {
        updateText: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        this.sendTextChange = debounce(this.sendTextChange, 500);
        this.setState({text:this.props.text});
    }

    render() {
        return (
            <Input style={this.props.style}
                   placeholder={this.props.placeholder}
                   onChangeText={ txt => this.handleTextChange(txt)}
                   value={this.state.text}/>
        );
    }

    handleTextChange = (text) => {
        this.setState({text: text});
        this.sendTextChange(text.trim())
    };

    sendTextChange = (text) => {
        this.props.updateText(text);
    };
}

export default DebouncedInputComponent;