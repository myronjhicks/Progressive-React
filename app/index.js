import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom } from "react-navigation";
import { Text } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Entypo';

import AnnouncementsScreen from './connect/AnnouncementsScreen';
import BibleScreen from './bible/BibleScreen';
import BlogScreen from './screens/BlogScreen';
import ChapterSelector from './bible/ChapterSelector';
import ConnectTab from './connect/ConnectTab';
import GiveScreen from './screens/GiveScreen';
import HomeScreen from './screens/HomeScreen';
import { MoreInfoStack } from './more/moreRouter';
import PrayerWallScreen from './connect/PrayerWallScreen';
import VideoDetail from './videos/VideoDetail';

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
    Give: {
        screen: GiveScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => (<Text marginT-5 text90 dark20 style={{fontWeight: 'bold', width: 50, textAlign: 'left'}}>GIVE</Text>)
        }
    },
    Connect: {
        screen: ConnectTab,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon name="share" size={24} color={tintColor} />
        }
    },
    MoreInfo: {
        screen: MoreInfoStack,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon name="dots-three-horizontal" size={24} color={tintColor} />
        }
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        style: {
            padding: 8,
        },
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
    },
    Blog: {
      screen: BlogScreen,
    }
}, {
    mode: 'modal',
    headerMode: 'screen',
});
