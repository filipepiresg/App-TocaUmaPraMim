import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, placeholder, secureTextEntry, value, onChangeText }) =>
{
	const { labelStyle, inputStyle, containerStyle } = styles;

	return(
		<View style={containerStyle}>
			<Text style={labelStyle}> {label} </Text>
			<TextInput
				style = { inputStyle }
				autoCorrect = { false }
				placeholder = { placeholder }
				secureTextEntry = { secureTextEntry }
				value = { value }
				onChangeText = { onChangeText }
				underlineColorAndroid='transparent'
			/>
		</View>
	);
};

const styles = 
{
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	inputStyle: {
		color:'#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
		flex: 2
	},
	containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}
}

export default Input;