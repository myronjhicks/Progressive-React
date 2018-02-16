import React, { Component } from 'react';
import { View, TextInput, Text, Colors, Typography } from 'react-native-ui-lib';

export default class FormInput extends Component {
    render() {
        return (
            <TextInput
                value={this.props.value} 
                floatingPlaceholder 
                text50 
                placeholder={this.props.placeholder} 
                dark10 
                autoCapitalize='none' 
                underlineColor={Colors.black}
                onChangeText={this.props.onChangeText}
            />
        );
    }
}