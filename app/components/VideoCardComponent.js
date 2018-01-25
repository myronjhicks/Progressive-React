import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Icon, 
    Button, 
    Text,
    Body, 
    Card, 
    CardItem 
} from 'native-base';

const { width, height } = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class VideoCardComponent extends Component {
    render() {
        return (
            <Card>
                <CardItem cardBody>
                    <Image
                        style={{alignSelf:'center'}}
                        maxWidth={equalWidth}
                        maxHeight={100}
                        source={require('../assets/video_image.jpg')} />
                </CardItem>
                <CardItem cardBody>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 4, marginLeft: 4}}>{this.props.video.title}</Text>
                        <Text style={{marginLeft: 4, fontSize: 14}}>{this.props.video.speaker}</Text>
                        <Text style={{marginLeft: 4, fontSize: 12, color: 'darkgrey'}}>{this.props.video.date}</Text>
                    </View>
                </CardItem>
            </Card>
        );
    }
}