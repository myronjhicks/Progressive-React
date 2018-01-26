import * as moment from 'moment';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
    Text,
    Body, 
    Card, 
    Container,
    Content,
    CardItem 
} from 'native-base';
import firebase from '../config/firebase';
import { connect } from 'react-redux';
import { fetchAnnouncements } from '../redux/actions/announcements';
import { Permissions, Notifications } from 'expo';

class AnnouncementsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Notifications',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerBackTitle: null,
            headerTruncatedBackTitle: 'Dismiss'
        }
      };

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchAnnouncements();
        this.registerForPushNotificationsAsync();
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

          firebase.database()
            .ref('deviceTokens')
            .child(deviceID)
            .update(update);
    }

    _renderItem = ({item}) => {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{fontSize: 16,}}>{item.text}</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>{moment.unix(item.timestamp).fromNow()}</Text>
                    </CardItem>
                </Card>
            </View>
        );
    };

    render() {
        if(this.props.isLoading) {
            return(<View></View>);
        }else{
            return(
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    data={this.props.announcements}
                    keyExtractor = {item => item.key}
                    renderItem={this._renderItem}
                />
            );
        }
    }
}

const styles = StyleSheet.create({ });

const mapStateToProps = (state) => {
    return { 
        announcements: state.announcements,
        isLoading: state.announcementsIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnnouncements: () => dispatch(fetchAnnouncements()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsScreen);