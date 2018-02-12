import React, { Component } from 'react';
import { View, Platform, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { AppLoading } from "expo";
import { Button, Icon } from 'native-base';
import { Permissions, Notifications }  from 'expo';
import LiveStreamViewer from '../components/LiveStreamViewer.js';
import ProgressiveHeader from '../components/ProgressiveHeader';
import { connect } from 'react-redux';
import { listenToEvents } from '../redux/actions/events';
import { listenToLivestream } from '../redux/actions/livestream';
import { listenToAnnouncements } from '../redux/actions/announcements';
import { listenToPrayers } from '../redux/actions/prayers';
import { listenToVideos } from '../redux/actions/videos';
import { listenToBlogs } from '../redux/actions/blogPosts';
import firebase from '../config/firebase';
import VideoListComponent from '../videos/VideoListComponent';
const { width, height } = Dimensions.get('window');

const livestreamImageSource = require('../assets/current_livestream.png');
const playButtonSource = require('../assets/icons/playIcon.png');

import { Constants, Card, Colors, Typography, Text } from 'react-native-ui-lib';

class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Home',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerRight: (
                <Button light transparent onPress={params.showNotifications}>
                    <Icon name="notifications" size={24} />
                </Button>
            )
        }
      };

    constructor(props){
        super(props);
        this.state = { latestVideo: {} };
    }

    showNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }

    componentDidMount() {
        this.registerForPushNotificationsAsync();
        this.props.subscribeToEvents();
        this.props.subscribeToLivestream();
        this.props.subscribeToAnnouncements();
        this.props.subscribeToPrayers();
        this.props.subscribeToVideos();
        this.props.subscribeToBlogs();
        this.props.navigation.setParams({showNotifications: this.showNotifications});
        this._showVideoDetail = this._showVideoDetail.bind(this);
        this._onPressPlayButton = this._onPressPlayButton.bind(this);
    }

    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
          );
          let finalStatus = existingStatus;

          // only ask if permissions have not already been determined, because
          // iOS won't necessarily prompt the user a second time.
          if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }

          // Stop here if the user did not grant permissions
          if (finalStatus !== 'granted') {
            return;
          }

          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          var update = {}
          update["/expoToken"] = token;
          update["/platform"] = Platform.OS;
          var matches = token.match(/\[(.*?)\]/);
          var deviceID = matches[1];
          firebase.database().ref('deviceTokens').child(deviceID).update(update);
    }

    _showVideoDetail = (video) => {
        this.props.navigation.navigate('VideoDetail', { ...video });
    }

    _onPressPlayButton = (latestVideo) => {
        this.props.navigation.navigate('VideoDetail', { ...latestVideo });
    }

    render() {
        if (!this.props.videos.length) {
            return <AppLoading />;
          }
        var latestVideo = this.props.videos.filter(a => a.key == this.props.livestream)
        if(latestVideo.length) { latestVideo = latestVideo[0] }
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    style={{flex: 0.75, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}
                    source={livestreamImageSource}>
                    <TouchableOpacity onPress={_ => this._onPressPlayButton(latestVideo)}>
                        <Image source={playButtonSource} style={{width: 80, height: 80, marginBottom: 10}} />
                    </TouchableOpacity>
                    <Text white text50>LATEST SERMON</Text>
                    <Text white text30>{latestVideo.title}</Text>
                </ImageBackground>
                <VideoListComponent videos={this.props.videos} onPress={_ => this._showVideoDetail} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      livestream: state.livestream,
      videos: state.videos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        subscribeToEvents: () => dispatch(listenToEvents()),
        subscribeToLivestream: () => dispatch(listenToLivestream()),
        subscribeToAnnouncements: () => dispatch(listenToAnnouncements()),
        subscribeToPrayers: () => dispatch(listenToPrayers()),
        subscribeToVideos: () => dispatch(listenToVideos()),
        subscribeToBlogs: () => dispatch(listenToBlogs()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
