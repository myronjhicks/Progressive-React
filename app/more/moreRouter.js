import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";
import MoreListView from "./MoreListView";
import HistoryScreen from "./HistoryScreen";
import ShareScreen from "./ShareScreen";
import AboutScreen from "./AboutStreen";
import BelieveScreen from './BelieveScreen';
import FeedbackScreen from './FeedbackScreen';
import LoginScreen from '../admin/LoginScreen';
import WorshipGuideComponent from '../components/WorshipGuideComponent';
import { AdminStack } from '../admin/index';

export const MoreInfoStack = createStackNavigator({
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
