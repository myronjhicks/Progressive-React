import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ImageBackground } from 'react-native';
import { Button, Text } from 'native-base';

export default class ShareScreen extends Component {

    _renderHeader = () => {
        return (
            <ImageBackground
                style={{
                    flex: 0.3,
                    alignItems: 'center',
                }}
                source={require('../assets/share.jpg')}>
            </ImageBackground>
        );
    };

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                { this._renderHeader()  }
                <View style={{backgroundColor: 'white', flex: 0.3}}>
                    <Text style={{fontSize: 32, marginTop: 12, textAlign: 'center'}}>305,860,488</Text>
                    <Text style={{fontSize: 16, textAlign: 'center', marginTop: 4}}>SHARES & COUNTING</Text>
                    <Text style={{fontSize: 10, textAlign: 'center', marginTop: 8}}>With your help, we can connect people to the heart of God, the salvation of Jesus, and the familiy within His church.</Text>
                </View>

                <View style={{flex: 0.4, backgroundColor: 'white', alignItems: 'center'}}>
                    <Button full style={{backgroundColor:'#00aced', height: 50, marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                        <Text style={{color:'#ffffff',fontWeight:'800',}}>Share on Twitter</Text>
                    </Button>

                    <Button full style={{backgroundColor:'#3b5998', height: 50, marginLeft: 20, marginRight: 20}}>
                        <Text style={{color:'#ffffff',fontWeight:'800',}}>Share on Facebook</Text>
                    </Button>
                </View>

            </View>
        );
    }
}