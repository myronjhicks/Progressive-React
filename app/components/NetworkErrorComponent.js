import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class NetworkErrorComponent extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="cloud-off" size={60} color={'#696969'} />
                <Text style={{fontSize: 18, marginBottom: 20}}>Wake up your connection!</Text>
                <Text style={{color: '#696969', fontSize: 12, textAlign: 'center', marginBottom: 24}}>Your internet connection seems to slow to reach our server</Text>
                <Text>Try again</Text>
            </View>
        );
    }

}