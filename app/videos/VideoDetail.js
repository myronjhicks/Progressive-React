import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, ScrollView, Dimensions, WebView, SafeAreaView } from 'react-native';
import { Text, ListItem, Body } from 'native-base';
import LiveStreamViewer from '../components/LiveStreamViewer.js';
import moment from 'moment';
import { Video } from 'expo';
import VideoPlayer from '../components/VideoPlayer';

export default class VideoDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: ' ',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(props){
        super(props);
    }

    render() {
        const { key, date, title, speaker, id, video_url, caption } = this.props.navigation.state.params;
        return(
            <ScrollView style={styles.container}>
                <VideoPlayer
                    videoProps={{
                      shouldPlay: true,
                      resizeMode: Video.RESIZE_MODE_CONTAIN,
                      source: {
                        uri: video_url,
                      },
                      isMuted: false,
                      ref: component => {
                        this._playbackInstance = component;
                      },
                    }}
                    showControlsOnLoad={true}
                    isPortrait={false}
                    switchToLandscape={null}
                    switchToPortrait={null}
                    playFromPositionMillis={0}
                  />
                <ListItem>
                    <Body>
                        <Text>{title}</Text>
                        <Text note>{speaker}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text note>Description</Text>
                        <Text>If you'd like to know more about our ministry please visit us at https://progressivechicago.org. And if you have a testimony of the amazing things God is doing in your life through our ministry, please email it to info@progressivechicago.org. @progressivechicago | @charliedates | #progressivechicago</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>Published</Text>
                        <Text note>{moment(date).format('MMM DD, YYYY')}</Text>
                    </Body>
                </ListItem>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})
