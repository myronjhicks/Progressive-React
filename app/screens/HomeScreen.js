import React, { Component } from 'react';
import { StatusBar, View, ImageBackground, Platform } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import Expo from 'expo';
import Image from 'react-native-scalable-image';
import LiveStreamViewer from '../components/LiveStreamViewer.js';
import firebase from '../config/firebase';


export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Home',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerRight: (
                <Button light transparent onPress={params.showNotifications}>
                    <Icon name="notifications" size={24} />
                </Button>
            )
        }
      };

    showNotifications = () => {
        this.props.navigation.navigate('Notifications');
    }

    constructor(props) {
        super(props);
        this.dbRef = firebase.database().ref('livestream');
        this.unsubscribe = null;
        this.state = {
            livestreamID: '',
        };
    }

    componentDidMount() {
        this.unsubscribe = this.dbRef.on('value', this.onRefUpdate);
        this.props.navigation.setParams({showNotifications: this.showNotifications});
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onRefUpdate = (snapshot) => {
        const data = snapshot.val();
        this.setState({
            livestreamID: data.event
        });
    }
        
    _renderHeader = () => {
        return (
            <ImageBackground
                style={{
                    flex: 0.5,
                    alignItems: 'center',
                }}
                source={require('../assets/backdrop.jpg')}>
                <View>
                    <Image
                        style={{marginTop: 20, marginBottom: 20, alignSelf: 'center'}}
                        maxWidth={250}
                        maxHeight={100}
                        source={require('../assets/pbc_logo_trans.png')}>
                    </Image>
                </View>
            </ImageBackground>
        );
    };

    render() {
        if(this.state.livestreamID === ''){
            return (<View><StatusBar barStyle='light-content'/></View>);
        }else{
            return (
                <View style={{flex: 1}}>
                    <StatusBar barStyle='light-content'/>
                    { this._renderHeader() }
                    <LiveStreamViewer videoID={this.state.livestreamID}></LiveStreamViewer>
                </View>
            );
        }
    }
}