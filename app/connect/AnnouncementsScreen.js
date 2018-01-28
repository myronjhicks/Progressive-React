import * as moment from 'moment';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import {
    Text,
    Body,
    Card,
    Container,
    Content,
    CardItem
} from 'native-base';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

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
        if(this.props.announcements.length == 0) {
            return(
              <View>
                  <Image
                      maxWidth={width}
                      maxHeight={height}
                      source={require('../assets/empty_notifications.png')}>
                  </Image>
              </View>
            );
        }else{
          this.announcements = this.props.announcements.sort(function(a,b){
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
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

const mapStateToProps = (state) => {
    return {
        announcements: state.announcements,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsScreen);
