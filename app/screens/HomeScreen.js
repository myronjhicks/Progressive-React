import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import { Permissions, Notifications }  from 'expo';
import LiveStreamViewer from '../components/LiveStreamViewer.js';
import ProgressiveHeader from '../components/ProgressiveHeader';
import { connect } from 'react-redux';
import { listenToEvents } from '../redux/actions/events';
import { listenToLivestream } from '../redux/actions/livestream';
import { listenToAnnouncements } from '../redux/actions/announcements';
import { listenToPrayers } from '../redux/actions/prayers';
import firebase from '../config/firebase';

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

    showNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }

    componentDidMount() {
        this.registerForPushNotificationsAsync();
        this.props.subscribeToEvents();
        this.props.subscribeToLivestream();
        this.props.subscribeToAnnouncements();
        this.props.subscribeToPrayers();
        this.props.navigation.setParams({showNotifications: this.showNotifications});
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
          var matches = token.match(/\[(.*?)\]/);
          var deviceID = matches[1];

          firebase.database().ref('deviceTokens').child(deviceID).update(update);
    }

    render() {
      return (
        <View style={{flex: 1}}>
          <ProgressiveHeader />
          <LiveStreamViewer videoID={this.props.livestream}></LiveStreamViewer>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      livestream: state.livestream
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        subscribeToEvents: () => dispatch(listenToEvents()),
        subscribeToLivestream: () => dispatch(listenToLivestream()),
        subscribeToAnnouncements: () => dispatch(listenToAnnouncements()),
        subscribeToPrayers: () => dispatch(listenToPrayers())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
