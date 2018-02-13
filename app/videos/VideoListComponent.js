import React, { Component } from 'react';
import { FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import VideoCardComponent from '../components/VideoCardComponent';
import { Text } from 'react-native-ui-lib';
const livestreamImageSource = require('../assets/current_livestream.png');
const playButtonSource = require('../assets/icons/playIcon.png');

export default class VideoListComponent extends Component {

    constructor(props){
        super(props)
    }

    _renderCard = ({item}) => {
        return(
            <VideoCardComponent video={item} onPress={this.props.onPress(item)} />
        );
    }

    _renderHeader = () => {
        var latestVideo = this.props.latestVideo;
        return(
            <ImageBackground
                style={{height: 275, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}
                source={livestreamImageSource}>
                <TouchableOpacity onPress={_ => this.props.onPressPlay(latestVideo)}>
                    <Image source={playButtonSource} style={{width: 80, height: 80, marginBottom: 10}} />
                </TouchableOpacity>
                <Text white text50>LATEST SERMON</Text>
                <Text white text30>{latestVideo.title}</Text>
            </ImageBackground>
        );
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.videos}
                keyExtractor = {item => item.key}
                renderItem={this._renderCard}
                ListHeaderComponent={this._renderHeader}
                numColumns={2}
            />
        )
    }
}