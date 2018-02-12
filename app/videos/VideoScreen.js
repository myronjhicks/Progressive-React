import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import VideoListComponent from './VideoListComponent';
import { connect } from 'react-redux';

class VideoScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Videos',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(props){
        super(props);
        this._showVideoDetail = this._showVideoDetail.bind(this);
    }

    _showVideoDetail = (video) => {
        this.props.navigation.navigate('VideoDetail', { ...video });
    }

    render() {
        const videos = this.props.videos.reverse();
        return(
            <VideoListComponent videos={videos} onPress={_ => this._showVideoDetail} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.videos,
    };
};

export default connect(mapStateToProps)(VideoScreen);
