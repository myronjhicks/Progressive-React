import React from 'react';
import { View } from 'react-native';
import VideoListComponent from './VideoListComponent'
import { connect } from 'react-redux';

class VideosContainer extends React.Component {
    
    _showVideoDetail(video){
        this.props.navigation.push('VideoDetail', { ...video });
    }

    render() {
        return (
            <View>
                <VideoListComponent
                  videos={this.props.videos}
                  onPress={_ => this._showVideoDetail}
              />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      videos: state.videos
    };
};

export default connect(mapStateToProps)(VideosContainer);