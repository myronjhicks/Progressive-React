import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Card, Button, Toast, Colors } from 'react-native-ui-lib';
import NotificationForm from '../components/NotificationForm';
import firebase from '../config/firebase';

const backIcon = require('../assets/icons/chevron_back.png');

export default class NotificationScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            notificationBody: '',
            notificationTitle: '',
            showToast: false,
            toastMessage: ''
        };
        this.sendNotification = this.sendNotification.bind(this);
        this.onChangeNotificationBody = this.onChangeNotificationBody.bind(this);
        this.onChangeNotificationTitle = this.onChangeNotificationTitle.bind(this);
    }

    componentDidMount(){
        this.props.navigation.setParams({goBack: this.goBack});
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
          title: 'Send Notification',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2e2e2e',
          },
          headerLeft: (
            <Button onPress={params.goBack} link linkColor={Colors.white} iconStyle={{marginLeft: 8, width: 20, height: 20}} iconSource={backIcon} />
          ),
        }
      };

    
    onChangeNotificationTitle = (title) => {
        this.setState({notificationTitle: title});
    }
    
    onChangeNotificationBody = (body) => {
        this.setState({notificationBody: body});
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    sendNotification = () => {
        if(this.state.notificationBody == '' || this.state.notificationTitle == '') {
          this.setState({
            showToast: true,
            toastMessage: "Notifications must have a Title and Body"
          });
        }else{
          Alert.alert('Are you sure?', 'This cannot be undone.', [
            {text: 'Send', onPress: () => {
              let notification = {
                title: this.state.notificationTitle,
                body: this.state.notificationBody,
                timestamp: Date.now()
              };
              firebase.database().ref('notifications').push(notification)
              .then(() => {
                this.setState({
                  showToast: true,
                  toastMessage: "Notification sent successfully"
                });
                this.goBack();
              });
            }},
            {text: 'Cancel'}
          ],
          { cancelable: false }
          );
        }
      }

    
    render() {
        return (
            <View flex-1>
                <Toast
                    message={this.state.toastMessage}
                    allowDismiss
                    onDismiss={() => this.setState({showToast: false, toastMessage: ''})}
                    visible={this.state.showToast} />
                <Card height={300} containerStyle={{margin: 10, marginTop: 40}}>
                    <NotificationForm 
                        onChangeTitle={this.onChangeNotificationTitle}
                        onChangeBody={this.onChangeNotificationBody}
                        onSubmit={this.sendNotification} />
                </Card>
            </View>
        )
    }
}