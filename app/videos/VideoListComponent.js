import React, { Component } from 'react';
import { FlatList } from 'react-native';
import VideoCardComponent from '../components/VideoCardComponent';

export default class VideoListComponent extends Component {

    constructor(props){
        super(props)
    }

    _renderCard = ({item}) => {
        return(
            <VideoCardComponent video={item} onPress={this.props.onPress(item)} />
        );
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.videos}
                keyExtractor = {item => item.key}
                renderItem={this._renderCard}
                numColumns={2}
            />
        )
    }
}