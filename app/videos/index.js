import React, { Component } from 'react';
import Expo from 'expo';
import { Platform } from 'react-native';
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
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
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
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            } 
        }
    }
});