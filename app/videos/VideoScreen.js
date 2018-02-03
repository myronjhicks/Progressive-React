import React, { Component } from 'react';
import { StatusBar, View, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Icon,
    Button,
    Text,
    Body,
    Card,
    CardItem
} from 'native-base';
import VideoCardComponent from '../components/VideoCardComponent';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
const equalWidth =  (width / 2 );

class VideoScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Videos',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(props){
        super(props);
    }

    _showVideoDetail = (video) => {
        this.props.navigation.navigate('VideoDetail', { ...video });
    }

    _renderCard = ({item}) => {
        return(
            <TouchableOpacity onPress={_ => this._showVideoDetail(item)}>
                <VideoCardComponent video={item} />
            </TouchableOpacity>
        );
    }

    render() {
        const videos = this.props.videos.reverse();
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    data={videos}
                    keyExtractor = {item => item.key}
                    renderItem={this._renderCard}
                    numColumns={2}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.videos,
    };
};

export default connect(mapStateToProps)(VideoScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    videoCard: {
        flex: 1,
        flexDirection: 'column'
    }
});
