import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Container, Header, Title, Left,
    Right, Icon, Button, Text,
    Content, Body, Card, CardItem
} from 'native-base';
import { maybeOpenURL } from "react-native-app-link";

export default class GiveScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Give',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
              <Button light transparent onPress={params.goBack}>
                  <Icon name="arrow-back" size={24} />
              </Button>
          )
        }
      };

     _handleCancel = () => {
        this.props.navigation.goBack();
        };

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel});
    }

    _openGivelify = () => {
        maybeOpenURL("givelify://church_home/1071226301077886", {
            appName: "givelify",
            appStoreId: "id725815127",
            playStoreId: "com.pushcontrolz.givelify"
          }).catch(err => { console.log('error opening', err)});
    };

    render() {
        return(
            <ImageBackground
                style={styles.imageContainer}
                source={require('../assets/give.jpg')}>
                <View style={styles.container}>
                    <Text style={styles.tagline}>See what God can do through your generosity!</Text>
                    <Button full
                        style={styles.giveButton}
                        onPress={_ => this._openGivelify()}><Text>Give Now</Text></Button>
                </View>
            </ImageBackground>
        );
    }
}
const { deviceWidth, deviceHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        width: deviceWidth,
        marginBottom: 12
    },
    tagline: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 10
    },
    giveButton: {
        backgroundColor: '#c6ac71' //'#660000' //
    }
});
