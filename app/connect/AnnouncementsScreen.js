import * as moment from 'moment';
import React, { Component } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import {
    Body,
    Card,
    Container,
    Content,
    CardItem
} from 'native-base';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
const { width, height } = Dimensions.get('window');

const Announcement = ({announcement}) => {
  return (
    <View>
        <Card>
            <CardItem>
                <Body>
                    <Text style={{fontSize: 16,}}>{announcement.text}</Text>
                </Body>
            </CardItem>
            <CardItem footer>
                <Text>{moment.unix(announcement.timestamp).fromNow()}</Text>
            </CardItem>
        </Card>
    </View>
  );
}

const EmptyAnnouncement = () => {
  return (
    <View>
        <Image
            maxWidth={width}
            maxHeight={height}
            source={require('../assets/empty_notifications.png')}>
        </Image>
    </View>
  );
}

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
        this.announcements = [];
    }

    _renderHeader = () => {
      return (
        <NotificationForm />
      );
    }

    render() {
        if(this.props.announcements.length == 0) {
            return(
              <EmptyAnnouncement />
            );
        }

        this.announcements = this.props.announcements.sort(function(a,b){
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        return(
          <FlatList
            automaticallyAdjustContentInsets={false}
            data={this.announcements}
            keyExtractor = {item => item.key}
            renderItem={({item}) => <Announcement announcement={item} /> }
          />
        );

    }
}

const mapStateToProps = (state) => {
    return {
        announcements: state.announcements,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsScreen);
