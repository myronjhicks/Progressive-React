import React, { Component } from 'react';
import { Platform, Alert } from 'react-native';
import { Permissions, Notifications, Util, AppLoading }  from 'expo';
import { connect } from 'react-redux';
import { listenToEvents } from '../redux/actions/events';
import { listenToLivestream } from '../redux/actions/livestream';
import { listenToAnnouncements } from '../redux/actions/announcements';
import { listenToPrayers } from '../redux/actions/prayers';
import { listenToVideos } from '../redux/actions/videos';
import { listenToBlogs } from '../redux/actions/blogPosts';
import firebase from '../config/firebase';
import VideoListComponent from '../videos/VideoListComponent';
import NotificationButton from '../components/buttons/NotificationButton';

class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Home',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerRight: (
                <NotificationButton onPress={params.showNotifications} />
            )
        };
    };

    
    constructor(props) {
        super(props);
    }

    showNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }

    componentWillMount() {
        this.registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        const { title, body } = notification.data;
        Alert.alert(`${title}`, `${body}`, [
            {text: 'Show', onPress: () => {
                this.showNotifications();
            }},
            {text: 'Close'}
          ],
          { cancelable: false }
          );
    }

    componentDidMount() {
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

    componentWillUnmount() {
        if(this.state.updateListener){
            this.state.updateListener.remove();
        }
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
        this.props.videos.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });
        return (
            <VideoListComponent 
                latestVideo={latestVideo} 
                videos={this.props.videos} 
                onPress={_ => this._showVideoDetail} 
                onPressPlay={this._onPressPlayButton} 
            />
           
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
