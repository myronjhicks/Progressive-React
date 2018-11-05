import React, { Component } from 'react';
import { createStackNavigator } from "react-navigation";
import AdminScreen from './AdminScreen';
import NotificationScreen from './NotificationScreen';
import CalendarScreen from './CalendarScreen';
import AddEventScreen from './AddEventScreen';
import LiveStreamVideoForm from './LiveStreamVideoForm';

export const AdminStack = createStackNavigator({
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
    },
    LiveStreamVideoForm: {
      screen: LiveStreamVideoForm
    }
},{
    mode: 'card',
    headerMode: 'none',
});
