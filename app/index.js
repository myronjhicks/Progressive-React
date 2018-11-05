import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { MaterialIcons, Entypo } from '@expo/vector-icons';

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
import VideosContainer from './videos/VideosContainer';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    VideoDetail: {
        screen: VideoDetail
    },
    VideosList: {
        screen: VideosContainer
    }
}, {
    headerMode: 'none'
})

export const TabNavigator = createBottomTabNavigator({
    Home: {
      screen: HomeStack,
      navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => <Entypo name="home" size={24} color={tintColor} />
      }
    },
    Bible: {
        screen: BibleScreen,
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
        screen: ConnectTab,
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

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};


export const RootStack = createStackNavigator({
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
    VideoDetail: {
        screen: VideoDetail
    },
}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
        headerTitleStyle: {
            fontWeight: "bold",
            color: "#fff"
        },
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#2e2e2e',
        },
    }
});
