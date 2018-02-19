import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import Image from 'react-native-scalable-image';


export default class EmptyPrayerList extends Component {
    render() {
        return (
            <View>
                <Image
                    style={{alignSelf: 'center', marginBottom: 40}}
                    maxWidth={150}
                    maxHeight={150}
                    source={require('../assets/EmptyArtwork.png')}>
                </Image>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.headerSubtitleText, {marginLeft: 8, marginRight: 8}]}>The great thing about prayer is that it shifts our perspective toward the One who stands ready to listen. No matter what you’re facing, we’d love to pray with you!</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerSubtitleText: {
        fontSize: 12, 
        textAlign: 'center', 
        color: '#A9A9A9', 
        marginBottom: 8
    },
});