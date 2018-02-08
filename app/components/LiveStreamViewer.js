import React, { Component } from 'react';
import { WebView, View, ActivityIndicator } from 'react-native';
import { Video } from '@shoutem/ui';

const BASE_URL = 'https://livestream.com/accounts/8044745/events/'
const ATTRIBUTES = "/player?width=0&height=0&enableInfoAndActivity=false&defaultDrawer=&autoPlay=true&mute=false";

import { connect } from 'react-redux';
import { livestreamLoding, livestreamFinishedLoading } from '../redux/actions/livestream'

export default class LiveStreamViewer extends Component {

    constructor(props) {
        super(props);
    }

    renderLoadingView = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#C6AC71" />
            </View>
        )
    };

    render() {
        var url = `${BASE_URL}${this.props.videoID}${ATTRIBUTES}`;
        if(this.props.videoID == '') {
            return (
                <View style={{backgroundColor: 'black', flex: 1}}></View>
            );
        }
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