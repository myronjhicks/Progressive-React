import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TextInput} from 'react-native';
import { Left, Right, Container, Content, Body, Item, Input, Text, Button, Card, CardItem} from 'native-base';
import firebase from '../config/firebase';
import moment from 'moment';
import Image from 'react-native-scalable-image';
import EmptyPrayerList from './EmptyPrayerList';

export default class PrayerWallScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Connect',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(props){
        super(props);
        this.dbRef = firebase.database().ref('prayerwall');
        this.unsubscribe = null;
        this.state = {
            prayers: [],
            prayer: '',
            name: '',
        }
    }

    componentDidMount() {
        this.unsubscribe = this.dbRef.orderByChild('date').on('value', this.onRefUpdate);
     }
 
     componentWillUnmount() {
         this.unsubscribe();
     }

     onRefUpdate = (snapshot) => {
        const prayers = [];
        snapshot.forEach( (childSnapshot) => {
            const data = childSnapshot.val();
            prayers.push({
                key: childSnapshot.key,
                date: data.date,
                name: data.name,
                content: data.content,
            });
        });
        var reveresed = prayers.reverse();
        this.setState({ prayers: reveresed });
    }

    _onChangePrayerText = (prayerText) => {
        this.setState({
            prayer: prayerText
        });
    };

    _onChangeNameText = (nameText) => {
        this.setState({
            name: nameText
        });
    };

    _onSubmitPrayer = () => {
        if(this.state.prayer){
            this.dbRef.push({
                name: this.state.name,
                content: this.state.prayer,
                date: new Date()
            })
            this.nameTextInput.clear();
            this.prayerTextInput.clear();
        }
    };

    _keyExtractor = (item, index) => item.key;

    _renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerTitleText}>The PBC Prayer Wall</Text>
                    <Text style={styles.headerSubtitleText}>How can we pray for you?</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.prayerInput}
                        placeholder="Post a Prayer ..."
                        placeholderTextColor="#A9A9A9"
                        multiline={true}
                        onChangeText={this._onChangePrayerText}
                        ref={input => { this.prayerTextInput = input }}
                    />
                    <TextInput 
                        style={styles.nameInput}
                        placeholder="Your Name"
                        placeholderTextColor="#A9A9A9"
                        onChangeText={this._onChangeNameText}
                        ref={input => { this.nameTextInput = input }}
                    />
                    <Button full onPress={this._onSubmitPrayer}>
                        <Text>Post to Wall!</Text>
                    </Button>
                </View>
            </View>
        );
    };



    _renderItem = ({item}) => {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>{item.content}</Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Left><Text>{item.name}</Text></Left>
                    <Body />
                    <Right><Text>{moment(item.date).format('ll')}</Text></Right>
                </CardItem>
            </Card>
        );
    }

    render() {
        if(!this.state.prayers || this.state.prayers.length == 0) {
            return (
                <View>
                    {this._renderHeader()}
                    <EmptyPrayerList />
                </View>
            );
        }
        return(
            <FlatList
                data={this.state.prayers}
                ListHeaderComponent={this._renderHeader}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 300,
        backgroundColor: 'white',
    },
    headerTitleText: {
        margin: 8, 
        marginBottom: 4, 
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    headerSubtitleText: {
        fontSize: 12, 
        textAlign: 'center', 
        color: '#A9A9A9', 
        marginBottom: 8
    },
    prayerInput: {
        height: 120,
        backgroundColor: 'lightgray',
        marginBottom: 8
    },
    nameInput: {
        height: 40,
        backgroundColor: 'lightgray',
        marginBottom: 8
    },
    inputContainer: {
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12
    },
    prayerContainer: {
        height: 150
    }
})