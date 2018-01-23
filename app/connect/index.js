import React, { Component } from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from "react-navigation";
import Expo from 'expo';
import AnnouncementsScreen from './AnnouncementsScreen';
import PrayerWallScreen from './PrayerWallScreen';
import ConnectScreen from './ConnectScreen';


export const ConnectStack = StackNavigator({
    ConnectScreen: {
        screen: ConnectScreen,
        navigationOptions: {
            title: 'Connect',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            } 
        }
    },
    Announcements : {
        screen: AnnouncementsScreen,
        navigationOptions: {
            title: 'Announcements',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            } 
        }
    },
    PrayerWall: {
        screen: PrayerWallScreen,
        navigationOptions: {
            title: ' ',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            } 
        }
    },
});