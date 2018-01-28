import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import Image from 'react-native-scalable-image';


export default class ProgressiveHeader extends Component {
    render() {
      return(
        <ImageBackground
            style={{
                flex: 0.5,
                alignItems: 'center',
            }}
            source={require('../assets/backdrop.jpg')}>
            <View>
                <Image
                    style={{marginTop: 20, marginBottom: 20, alignSelf: 'center'}}
                    maxWidth={250}
                    maxHeight={100}
                    source={require('../assets/pbc_logo_trans.png')}>
                </Image>
            </View>
        </ImageBackground>
      )
    }
}
