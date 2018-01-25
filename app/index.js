import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Button, Text, Footer, FooterTab } from "native-base";
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Expo from 'expo';
import Icon from 'react-native-vector-icons/Entypo';

import HomeScreen from './screens/HomeScreen';
import GiveScreen from './screens/GiveScreen';
import BibleScreen from './bible/BibleScreen';
import AnnouncementsScreen from './connect/AnnouncementsScreen';
import ConnectScreen from './connect/ConnectScreen';
import PrayerWallScreen from './connect/PrayerWallScreen';
import VideoScreen from './videos/VideoScreen';
import VideoDetail from './videos/VideoDetail';

import { MoreInfoStack } from './more/moreRouter';

import ChapterSelector from './bible/ChapterSelector';

export const Tabs = TabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: ({tintColor}) => <Icon name="home" size={24} color={tintColor} />
      }
    },
    Bible: {
        screen: BibleScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon name="book" size={24} color={tintColor} />
        }
    },
    Connect: {
        screen: ConnectScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon name="share" size={24} color={tintColor} />
        }
    },
    Videos: {
        screen: VideoScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon name="tv" size={24} color={tintColor} />
        }
    },
    MoreInfo: {
        screen: MoreInfoStack,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => 
                <Icon name="dots-three-horizontal" size={24} color={tintColor} />
        }
    }
},{
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
       bottomNavigationOptions: {
           labelColor: 'white',
           rippleColor: 'white',
           shifting: false,
       }
   },
});

export const Root = StackNavigator({
    Tabs:{
        screen: Tabs,
    },
    ChapterSelector: {
        screen: ChapterSelector
    },
    Notifications: {
        screen: AnnouncementsScreen,
    },
    PrayerWall: {
        screen: PrayerWallScreen,
    },
    VideoDetail: {
        screen: VideoDetail,
    }
}, {
    mode: 'modal',
    headerMode: 'screen',
});