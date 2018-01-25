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
        this.ref = firebase.firestore().collection('videos');
        this.unsubscribe = null;
        this.state = {
            loading: true,
            videos: [],
        }
    }

    componentDidMount() {
       this.unsubscribe = this.ref.orderBy('date', 'desc').onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const videos = [];
        querySnapshot.forEach( (doc) => {
            const {date, id, speaker, title} = doc.data();
            videos.push({
                key: doc.id,
                date: date,
                title: title,
                speaker: speaker,
                id: id,
                tags: []
            });
        });

        this.setState({
            loading: false,
            videos
        });
    }

    _showVideoDetail = (video) => {
        this.props.navigation.navigate('VideoDetail', { ...video });
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={_ => this._showVideoDetail(item)}>
                <View style={{height: 200, width: equalWidth}}>
                    <Card>
                        <CardItem cardBody>
                            <View style={styles.videoCard}>
                                <Image
                                    style={{alignSelf:'center'}}
                                    maxWidth={equalWidth}
                                    maxHeight={100}
                                    source={require('../assets/video_image.jpg')} />
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 4, marginLeft: 4}}>{item.title}</Text>
                                    <Text style={{marginLeft: 4, fontSize: 14}}>{item.speaker}</Text>
                                    <Text style={{marginLeft: 4, fontSize: 12, color: 'darkgrey'}}>{item.date}</Text>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    data={this.state.videos}
                    keyExtractor = {item => item.key}
                    renderItem={this._renderItem}
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