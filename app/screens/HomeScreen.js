import React from 'react';
import { Platform, Alert, ScrollView, View, Text, Image } from 'react-native';
import { Permissions, Notifications }  from 'expo';
import { Button, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import VideoListComponent from '../videos/VideoListComponent';
import CarouselContainer  from '../components/CarouselContainer';
import * as _ from 'lodash';
const videoImageSource = require('../../assets/guide.jpg');
const welcomeImageSource = require('../../assets/welcome.jpg')

class HomeScreen extends React.Component {

    state = {
      entries: []
    };

    showNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }

    componentDidMount() {
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
        this.props.navigation.setParams({showNotifications: this.showNotifications});
        this._showVideoDetail = this._showVideoDetail.bind(this);
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

    _showVideoDetail(video){
      this.props.navigation.push('VideoDetail', { ...video });
    }

    _showVideoList() {
      this.props.navigation.push('Connect');
    }

    render() {
        this.props.videos.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });
        return (
            <ScrollView>
              <Image source={welcomeImageSource} style={{height: 300, width: null, flex: 1}}/>
              <CarouselContainer />
              <VideoListComponent
                  livestream={this.props.livestream}
                  videos={_.take(this.props.videos, 3)}
                  onPress={_ => this._showVideoDetail}
              />
              <View style={{flex: 1}}>
                <Button full transparent onPress={_ => this._showVideoList()}><Text>BROWSE MORE SERMONS</Text></Button>
              </View>
              <View style={{flex: 1}}>
                <Text style={{padding: 10}}>Progressive Worship</Text>
                <Card style={{flex: 0}}>
                  <CardItem cardBody>
                    <Image source={videoImageSource} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                </Card>
              </View>
              <View style={{flex: 1}}>
                <Text style={{padding: 10}}>Follow Us On Social Media</Text>
                <View style={{flex: 1, marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Image source={require('../assets/icons/instagram-icon.png')} style={{width: 60, height: 60}} />
                  <Image source={require('../assets/icons/facebook-icon.png')} style={{width: 60, height: 60}} />
                  <Image source={require('../assets/icons/youtube-icon.png')} style={{width: 60, height: 60}} />
                  <Image source={require('../assets/icons/instagram-icon.png')} style={{width: 60, height: 60}} />
                </View>
              </View>
            </ScrollView>

        );
    }
}

const mapStateToProps = (state) => {
    return {
      livestream: state.livestream,
      videos: state.videos
    };
};

export default connect(mapStateToProps)(HomeScreen);
