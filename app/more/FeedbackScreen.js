import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput } from 'react-native';
import { Button, Text, Input, Item } from 'native-base';
import firebase from '../config/firebase';


export default class FeedbackScreen extends Component {

    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('feedback');
        this.state = {feedback: '', email: ''};
    }

    _onChangeFeedbackText = (feedback) => {
        this.setState({feedback: feedback});
    };

    _onChangeEmailText = (email) => {
        this.setState({email: email});
    };

    _submitFeedback = () => {
        if(this.state.feedback && this.state.email) {
            var values = {
                email: this.state.email,
                content: this.state.feedback,
                date: new Date()
            };
            this.ref
            .add(values)
            .then(function(docRef){
                console.log('Document written with ID:', docRef.id)
            })
            .catch(function(error){
                console.error('Error adding document: ', error);
            })

            this.feedbackInput.clear();
            this.emailInput.clear();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackText}>Feedback</Text>
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.prayerInput}
                            placeholder="What's on your mind ..."
                            placeholderTextColor="#A9A9A9"
                            multiline={true}
                            onChangeText={this._onChangeFeedbackText}
                            ref={input => { this.feedbackInput = input }}
                        />
                        <TextInput 
                            style={styles.nameInput}
                            placeholder="email@example.com"
                            placeholderTextColor="#A9A9A9"
                            onChangeText={this._onChangeEmailText}
                            ref={input => { this.emailInput = input }}
                        />
                        <Button full onPress={this._submitFeedback}>
                            <Text>Submit Feedback!</Text>
                        </Button>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    feedbackContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    feedbackText: {
        fontSize: 42,
        color: 'black'
    },
    mindText: {
        fontSize: 24,
        color: 'lightgray'
    },
    headerContainer: {
        height: 300,
        backgroundColor: 'white',
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