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
import LoginScreen from '../admin/LoginScreen';
import AdminScreen from '../admin/AdminScreen';
import WorshipGuideComponent from '../components/WorshipGuideComponent';
import { AdminStack } from '../admin/index';

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
    Login: {
      screen: LoginScreen
    },
    Admin: {
      screen: AdminStack
    },
    Guide: {
        screen: WorshipGuideComponent
    }
}, {
    mode: 'card',
    headerMode: 'none',
});
