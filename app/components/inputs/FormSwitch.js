import React, { Component } from 'react';
import { Switch } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

export default class FormSwitch extends Component {
    render() {
        return (
            <View row spread>
                <Text text50>{this.props.header}</Text>
                <Switch value={this.props.toggle} onValueChange={this.props.onValueChange} />
            </View> 
        );
    }
}