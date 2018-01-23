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

import { MoreInfoStack } from './more/moreRouter';
import { ConnectStack } from './connect/index';
import { VideoStack } from './videos/index';

import ChapterSelector from './bible/ChapterSelector';


export const HomeNavigator = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    Notifications: {
        screen: AnnouncementsScreen,
    }
},{
    mode: 'modal',
    headerMode: 'screen'
});

export const Tabs = TabNavigator({
    Home: {
      screen: HomeNavigator,
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
        screen: ConnectStack,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon name="share" size={24} color={tintColor} />
        }
    },
    Videos: {
        screen: VideoStack,
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
    }
}, {
    mode: 'modal',
    headerMode: 'none',
});












/**
 * import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import { Button, Text, Footer, FooterTab } from "native-base";
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Expo from 'expo';
import Icon from 'react-native-vector-icons/Entypo';

import HomeScreen from './screens/HomeScreen';
import GiveScreen from './screens/GiveScreen';
import BibleScreen from './bible/BibleScreen';

import { MoreInfoStack } from './more/moreRouter';
import { ConnectStack } from './connect/index';
import { VideoStack } from './videos/index';

import ChapterSelector from './bible/ChapterSelector';


export const HomeNavigator = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            },
        }
    }
});

export const Tabs = TabNavigator({
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: ({tintColor}) => <Icon style={{marginTop: 10}} name="home" size={25} color={tintColor} />
      }
    },
    Bible: {
        screen: BibleScreen,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon style={{marginTop: 10}} name="book" size={25} color={tintColor} />
        }
    },
    Connect: {
        screen: ConnectStack,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon style={{marginTop: 10}} name="share" size={25} color={tintColor} />
        }
    },
    Videos: {
        screen: VideoStack,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => <Icon style={{marginTop: 10}} name="tv" size={25} color={tintColor} />
        }
    },
    MoreInfo: {
        screen: MoreInfoStack,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({tintColor}) => 
                <Icon style={{marginTop: 10}} name="dots-three-horizontal" size={30} color={tintColor} />
        }
    }
},{
   tabBarPosition: 'bottom',
   tabBarOptions: {
       activeTintColor: 'black',
       showIcon: true,
   },
});

export const Root = StackNavigator({
    Tabs:{
        screen: Tabs,
    },
    ChapterSelector: {
        screen: ChapterSelector
    }
}, {
    mode: 'modal',
    headerMode: 'none',
});
 */