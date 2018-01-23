import React, { Component } from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import Expo from 'expo';
import MoreListView from "./MoreListView";
import HistoryScreen from "./HistoryScreen";
import ShareScreen from "./ShareScreen";
import AboutScreen from "./AboutStreen";
import BelieveScreen from './BelieveScreen';
import GiveScreen from '../screens/GiveScreen';
import FeedbackScreen from './FeedbackScreen';

export const MoreInfoStack = StackNavigator({
    MoreList: {
        screen: MoreListView,
        navigationOptions: {
            title: 'More',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            title: 'About Us',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        }
    },
    Believe: {
        screen: BelieveScreen,
        navigationOptions: {
            title: 'What We Believe',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        },
    },
    History: {
        screen: HistoryScreen,
        navigationOptions: {
            title: 'Our History',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        },
    },
    Share: {
        screen: ShareScreen,
        navigationOptions: {
            title: 'Share',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        }
    },
    Give: {
        screen: GiveScreen,
        navigationOptions: {
            title: 'Give',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        }
    },
    Feedback: {
        screen: FeedbackScreen,
        navigationOptions: {
            title: ' ',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            }  
        }
    },
});