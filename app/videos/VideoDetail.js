import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Dimensions, WebView, SafeAreaView } from 'react-native';
import { Text } from 'native-base';
import LiveStreamViewer from '../components/LiveStreamViewer.js';

export default class VideoDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: ' ',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(props){
        super(props);
    }

    render() {
        const { key, date, title, speaker, tags, id } = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <LiveStreamViewer videoID={id}></LiveStreamViewer>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>Sermon</Text>
                    <Text style={styles.info}>{title}</Text>
                    <Text style={styles.infoSmall}>{speaker}</Text>
                    <Text style={styles.infoSmall}>{date}</Text>
                    <Text style={styles.tags}>{tags.join(' ')}</Text>
                    <View style={styles.bottomContainer}>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    infoContainer: {
        flex: 2,
        backgroundColor: 'black',
    },
    info: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 12
    },
    infoSmall: {
        fontSize: 14,
        color: 'darkgrey',
        marginBottom: 14,
        marginLeft: 12
    },
    infoHeader: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 4,
        marginLeft: 12,
        marginTop: 12
    },
    tags: {
        color: 'white',
        fontSize: 14,
        marginLeft: 12
    },
    bottomContainer: {
        backgroundColor: '#353535', 
        height: 40,
        marginTop: 20
    }
})