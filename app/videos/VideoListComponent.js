import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { FlatList, ImageBackground, TouchableOpacity, Image, View } from 'react-native';
import VideoCard from '../components/VideoCard';
import { Text } from 'react-native-ui-lib';
const livestreamImageSource = require('../assets/current_livestream.png');
const playButtonSource = require('../assets/icons/playIcon.png');

export default class VideoListComponent extends Component {

    _renderCard = ({item}) =>  <VideoCard video={item} onPress={this.props.onPress(item)} />

    renderHeader = () => {
      return <Text style={{margin: 10}}>Stream Past Sermons</Text>
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.videos}
                keyExtractor = {item => item.key}
                renderItem={this._renderCard}
                ListHeaderComponent={this.renderHeader}
            />
        )
    }
}
