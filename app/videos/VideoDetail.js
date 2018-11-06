import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, ScrollView, Dimensions, WebView, SafeAreaView } from 'react-native';
import { Text, ListItem, Body, Button } from 'native-base';
import moment from 'moment-timezone';
import { Video } from 'expo';
import VideoPlayer from '../components/VideoPlayer';

export default class VideoDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Video Detail',
        }
      };

    constructor(props){
        super(props);
    }

    render() {
        const { key, date, title, speaker, id, video_url, description } = this.props.navigation.state.params;
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
                        <Text>{description}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>Published</Text>
                        <Text note>{moment(date.seconds * 1000).tz('America/Chicago').format('MMM DD, YYYY')}</Text>
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
