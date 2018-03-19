import React, { Component } from 'react';
import { FlatList, ImageBackground, TouchableOpacity, Image, View } from 'react-native';
import VideoCard from '../components/VideoCard';
import { Text } from 'react-native-ui-lib';
const livestreamImageSource = require('../assets/current_livestream.png');
const playButtonSource = require('../assets/icons/playIcon.png');

export default class VideoListComponent extends Component {

    constructor(props){
        super(props)
    }

    _renderCard = ({item}) => {
        return(
            <VideoCard video={item} onPress={this.props.onPress(item)} />
        );
    }

    _renderHeader = () => {
        if(this.props.videos.length){
          var latestVideo = this.props.videos[0];
          return(
              <ImageBackground
                  style={{height: 275, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}
                  source={livestreamImageSource}>
                  <TouchableOpacity onPress={_ => this.props.onPressPlay(latestVideo)}>
                      <Image source={playButtonSource} style={{width: 80, height: 80, marginBottom: 10}} />
                  </TouchableOpacity>
                  <Text white text50>LATEST SERMON</Text>
                  <Text white text30 center>{latestVideo.title}</Text>
              </ImageBackground>
          );
        }else{
          return (<View></View>)
        }
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
