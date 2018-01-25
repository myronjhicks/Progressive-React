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
import firebase from '../config/firebase';
const { width, height } = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class VideoScreen extends Component {

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
        this.dbRef = firebase.database().ref('videos');
        this.unsubscribe = null;
        this.state = {
            loading: true,
            videos: [],
        }
    }

    componentDidMount() {
        this.unsubscribe = this.dbRef.orderByChild('date').on('value', this.onRefUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onRefUpdate = (snapshot) => {
        const videos = [];
        snapshot.forEach( (childSnapshot) => {
            const data = childSnapshot.val();
            videos.push({
                key: childSnapshot.key,
                date: data.date,
                title: data.title,
                speaker: data.speaker,
                id: data.id,
                tags: []
            });
        });

        var reveresed = videos.reverse();
        this.setState({loading: false, videos:  reveresed});
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
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    data={this.state.videos}
                    keyExtractor = {item => item.key}
                    renderItem={this._renderCard}
                    numColumns={2}
                />
            </View>
        );
    }
} 

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