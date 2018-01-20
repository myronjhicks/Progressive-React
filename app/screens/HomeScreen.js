import React, { Component } from 'react';
import { View, ImageBackground, StatusBar, Platform } from 'react-native';
import Expo from 'expo';
import Image from 'react-native-scalable-image';
import LiveStreamViewer from '../components/LiveStreamViewer.js';
import firebase from '../config/firebase';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('livestream').doc('livestream');
        this.unsubscribe = null;
        this.state = {
            livestreamID: '8012994',
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (doc) => {
        const { event } = doc.data();
        this.setState({
            livestreamID: event,
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
            return (<View></View>);
        }else{
            return (
                <View style={{flex: 1}}>
                    { this._renderHeader() }
                    <LiveStreamViewer videoID={this.state.livestreamID}></LiveStreamViewer>
                </View>
            );
        }
    }
}