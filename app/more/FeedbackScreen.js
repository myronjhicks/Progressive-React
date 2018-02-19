import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Button, Input, Item, Icon } from 'native-base';
import { View, TextInput, Text } from 'react-native-ui-lib';
import firebase from '../config/firebase';
import BackButton from '../components/buttons/BackButton';


export default class FeedbackScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Leave Feedback',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
                <BackButton onPress={params.goBack} />
          )
        }
      };

      componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel});
        }
    
     _handleCancel = () => {
        this.props.navigation.goBack();
        };

    constructor(props){
        super(props);
        this.dbRef = firebase.database().ref('feedback');
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
            this.dbRef.push({
                email: this.state.email,
                content: this.state.feedback,
                date: new Date()
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
                        <Button full onPress={this._submitFeedback} style={{backgroundColor: '#c6ac71'}}>
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