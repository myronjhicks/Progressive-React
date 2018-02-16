import React, { Component } from 'react';
import { FlatList, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import EventCard from '../components/EventCard'; 
import { Text, View, Card, Colors } from 'react-native-ui-lib';
import firebase from '../config/firebase';
const { width, height } = Dimensions.get('window');
const half = width / 2;

export default class EventListComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: undefined
        }
    }

    _renderHeader = () => {
        return (
            <Card height={350} containerStyle={{margin: 20}}>
                <Card.Image 
                    height={'75%'}
                    resizeMode="cover"
                    imageSource={{uri: this.state.url}} 
                />
                <Card.Section>
                    <View padding-12>
                        <Text text50 marginB-4 color={Colors.black}>Young Black & Christian</Text>
                        <Text text70 marginB-4 color={Colors.dark20}>February 27, 2018</Text>
                        <Text text90 color={Colors.dark20}>7:00pm</Text>
                    </View>
                </Card.Section>
            </Card>
        );
    }

    componentWillMount() {
        firebase.storage()
            .ref('images/ybc.jpg')
            .getDownloadURL()
            .then(function(url){ return url })
            .then(url => this.setState({url}));
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.events}
                keyExtractor = {item => item.key}
                ListHeaderComponent={this.state.url && this._renderHeader}
                renderItem={({item}) => <EventCard event={item} />}
            />
        )
    }
}

