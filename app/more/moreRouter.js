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
    },
    About: {
        screen: AboutScreen,
    },
    Believe: {
        screen: BelieveScreen,
    },
    History: {
        screen: HistoryScreen,
    },
    Share: {
        screen: ShareScreen,
    },
    Give: {
        screen: GiveScreen,
    },
    Feedback: {
        screen: FeedbackScreen,
    },
}, {
    mode: 'card',
    headerMode: 'none',
});