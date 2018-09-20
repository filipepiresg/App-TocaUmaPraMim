import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 20,
        margin: 10,
        height: 64,
        width: 140,
        alignItems: 'center',
        backgroundColor: '#069',
        borderRadius: 4, borderWidth: 2, borderColor: '#d6d7da'
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center'
    }
});

const Button = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={props.style || styles.buttonStyle}>
            <Text style={styles.textStyle}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;