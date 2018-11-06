import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import BibleScreen from './bible/BibleScreen';
import ChapterSelector from './bible/ChapterSelector';
import ConnectTab from './connect/ConnectTab';
import GiveScreen from './screens/GiveScreen';
import HomeScreen from './screens/HomeScreen';
import { MoreInfoStack } from './more/moreRouter';
import VideoDetail from './videos/VideoDetail';
import VideosContainer from './videos/VideosContainer';
import EventDetail from './events/EventDetail';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
        },
    },
    VideoDetail: VideoDetail,
    VideosList: VideosContainer
},{
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2e2e2e',
        },
    },
});

const connectStack = createStackNavigator({
    Connect: ConnectTab,
    EventDetail: EventDetail,
    VideoDetail: VideoDetail
}, {
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2e2e2e',
        },
    },
  });

const BibleStack = createStackNavigator({
    Bible: BibleScreen,
    ChapterSelector: ChapterSelector
}, {
    navigationOptions: {
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: '#2e2e2e',
        },
    },
    mode: 'modal'
})

export const RootStack = createBottomTabNavigator({
    Home: {
      screen: HomeStack,
      navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => <Entypo name="home" size={24} color={tintColor} />
      }
    },
    Bible: {
        screen: BibleStack,
        navigationOptions: {
            tabBarLabel: 'Bible',
            tabBarIcon: ({tintColor}) => <Entypo name="book" size={24} color={tintColor} />
        }
    },
    Give: {
        screen: GiveScreen,
        navigationOptions: {
            tabBarLabel: 'Give',
            tabBarIcon: ({tintColor}) => <MaterialIcons name="payment" size={24} color={tintColor} />
        }
    },
    Connect: {
        screen: connectStack,
        navigationOptions: {
            tabBarLabel: 'Connect',
            tabBarIcon: ({tintColor}) => <Entypo name="share" size={24} color={tintColor} />
        }
    },
    MoreInfo: {
        screen: MoreInfoStack,
        navigationOptions: {
            tabBarLabel: 'More',
            tabBarIcon: ({tintColor}) => <Entypo name="dots-three-horizontal" size={24} color={tintColor} />
        }
    }
},{
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: '#dea92c',
        style: {
            backgroundColor: '#2e2e2e'
        }
    }
});


/*export const RootStack = createStackNavigator({
    Tabs:{
        screen: TabNavigator,
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
    Blog: {
      screen: BlogScreen,
    },
}, {
    initialRouteName: 'Tabs',
});*/
