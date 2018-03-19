import React, { Component } from 'react';
import { WebView, View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Audio, Video } from 'expo';
import { connect } from 'react-redux';
import { livestreamLoding, livestreamFinishedLoading } from '../redux/actions/livestream'

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '...loading...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2;

export default class LiveStreamViewer extends Component {

    constructor(props) {
        super(props);
        this.isSeeking = false,
        this.playbackInstance = null;
        this.state = {
          showVideo: true,
          playbackInstanceName: LOADING_STRING,
          loopingType: LOOPING_TYPE_ALL,
          muted: false,
          playbackInstancePosition: null,
          playbackInstanceDuration: null,
          shouldPlay: false,
          isPlaying: false,
          isBuffering: false,
          shouldCorrectPitch: true,
          volume: 1.0,
          rate: 1.0,
          videoWidth: DEVICE_WIDTH,
          videoHeight: VIDEO_CONTAINER_HEIGHT,
          poster: false,
          useNativeControls: true,
          fullScreen: false
        };
    }

    componentDidMount() {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
    }

    async _loadNewPlaybackInstance(playing){
      if(this.playbackInstance != null){
        await this.playbackInstance.unloadAsync();
        this.playbackInstance.setOnPlaybackStatusUpdate(null);
        this.playbackInstance = null;
      }

      const source = { uri: this.props.url }
      const initialStatus = {
        shouldPlay: playing,
        rate: this.state.rate,
        showCorrectPitch: this.state.showCorrectPitch,
        volume: this.state.volume,
        isMuted: this.state.isMuted,
        isLooping: this.state.isLooping
      };

      this._video.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      const status = await this._video.getStatusAsync();

      this._updateScreenForLoading(false);
    }

    _mountVideo = component => {
      if(component !== null) {
        this._video = component;
        this._loadNewPlaybackInstance(false);
      }
    }

    _updateScreenForLoading(isLoading){
      if(isLoading){
        this.setState({
          showVideo: false,
          isPlaying: false,
          playbackInstanceName: LOADING_STRING,
          playbackInstanceDuration: null,
          playbackInstancePosition: null,
          isLoading: true
        });
      }else{
        this.setState({
          playbackInstanceName: 'LIVESTREAM',
          showVideo: true,
          isLoading: false
        });
      }
    }

    _onPlaybackStatusUpdate = status => {
      if(status.isLoaded){
        this.setState({
          playbackInstancePosition: status.positionMillis,
          playbackInstanceDuration: status.durationMillis,
          shouldPlay: status.shouldPlay,
          isPlaying: status.isPlaying,
          isBuffering: status.isBuffering,
          rate: status.rate,
          muted: status.isMuted,
          volume: status.volume,
          loadingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
          shouldCorrectPitch: status.shouldCorrectPitch
        });
      }else{
        if(status.error){
          console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }
      }
    }

    _onReadyForDisplay = event => {
      const widestHeight = DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;
      if(widestHeight > VIDEO_CONTAINER_HEIGHT){
        this.setState({
          videoWidth: VIDEO_CONTAINER_HEIGHT * event.naturalSize.width / event.naturalSize.height,
          videoHeight: VIDEO_CONTAINER_HEIGHT
        });
      }else{
        this.setState({
          videoWidth: DEVICE_WIDTH,
          videoHeight: DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width
        });
      }
    }

    render() {
        return (
            <View style={styles.videoContainer}>
              <Video
                ref={this._mountVideo}
                style={[
                  styles.video,
                  {
                    opacity: this.state.showVideo ? 1.0 : 0.0,
                    width: this.state.videoWidth,
                    height: this.state.videoHeight
                  },
                ]}
                resizeMode={Video.RESIZE_MODE_CONTAIN}
                onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                onReadyForDisplay={this._onReadyForDisplay}
                useNativeControls={this.state.useNativeControls}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT
  },
  video: {
    maxWidth: DEVICE_WIDTH
  }
})
