import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import AdminScreen from './AdminScreen';
import NotificationScreen from './NotificationScreen';
import CalendarScreen from './CalendarScreen';
import AddEventScreen from './AddEventScreen';

export const AdminStack = StackNavigator({
    AdminScreen: {
        screen: AdminScreen
    },
    NotificationScreen: {
        screen: NotificationScreen
    },
    CalendarScreen: {
        screen: CalendarScreen
    },
    AddEventScreen: {
        screen: AddEventScreen
    }
},{
    mode: 'card',
    headerMode: 'none',
});