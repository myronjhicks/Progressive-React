import React, { Component } from 'react';
import { WebView, View } from 'react-native';

const BASE_URL = 'https://livestream.com/accounts/8044745/events/'
const ATTRIBUTES = "/player?width=0&height=0&enableInfoAndActivity=false&defaultDrawer=&autoPlay=true&mute=false";

import { connect } from 'react-redux';
import { livestreamLoding, livestreamFinishedLoading } from '../redux/actions/livestream'

export default class LiveStreamViewer extends Component {

    renderLoadingView = () => {
        return (
            <View style={{backgroundColor: 'black'}}></View>
        );
    };

    render() {
        var url = `${BASE_URL}${this.props.videoID}${ATTRIBUTES}`;
        return (
            <WebView
                source={{uri: url}}
                style={{backgroundColor: 'black'}}
                scrollEnabled={false}
                renderLoading={this.renderLoadingView}
                startInLoadingState={true}
            />
        );
    }
}