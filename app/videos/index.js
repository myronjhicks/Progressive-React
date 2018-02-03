import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import VideoScreen from './VideoScreen';
import VideoDetail from './VideoDetail';

export const VideoStack = StackNavigator({
    VideoFeed: {
        screen: VideoScreen,
        navigationOptions: {
            title: 'Videos',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }
        }
    },
    VideoDetail: {
        screen: VideoDetail,
        navigationOptions: {
            title: ' ',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }
        }
    }
});
