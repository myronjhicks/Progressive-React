import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text, Colors, Toast, Card, Button } from 'react-native-ui-lib';
import { logout } from '../redux/actions/authentication';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import firebase from '../config/firebase';
import { Icon } from 'native-base';
import LiveStreamForm from './LiveStreamForm';
import NotificationForm from '../components/NotificationForm';

const backIcon = require('../assets/icons/chevron_back.png');

class AdminScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      devices: 0,
      livestreamID: '',
      notificationTitle: '',
      notificationBody: '',
      showToast: false,
      toastMessage: '',
    }
    this.updateLivestream = this.updateLivestream.bind(this);
    this.onChangeLivestreamText = this.onChangeLivestreamText.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.onChangeNotificationBody = this.onChangeNotificationBody.bind(this);
    this.onChangeNotificationTitle = this.onChangeNotificationTitle.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({loggedIn: this.props.auth.loggedIn, logoutAdmin: this.logout, goBack: this._handleCancel});
    firebase.database().ref('deviceTokens')
      .once('value')
      .then(function(snapshot){
        return snapshot.numChildren();
      }).then(devices => this.setState({devices}));
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
          console.log('Sending: ' + this.state.notificationBody);
        }},
        {text: 'Cancel', onPress: () => console.log('Cancelling')}
      ],
      { cancelable: false }
      );
    }
  }

  updateLivestream = () => {
    var update = {};
    if(this.state.livestreamID != ''){
      update["/event"] = this.state.livestreamID;
      firebase.database().ref('livestream').update(update).then(() => {
        this.setState({
          showToast: true,
          toastMessage: 'Livestream update successfull'
        });
      }).catch((error) => {
        this.setState({
          showToast: true,
          toastMessage: 'Something went wrong. Try again later.'
        });
      });
    }
  }

  onChangeLivestreamText = (eventId) => {
    this.setState({
      livestreamID: eventId
    });
  }

  onChangeNotificationTitle = (title) => {
    this.setState({notificationTitle: title});
  }

  onChangeNotificationBody = (body) => {
    this.setState({notificationBody: body});
  }

  _handleCancel = () => {
    this.props.navigation.goBack();
  };

  logout = () => {
    this.props.logout();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Admin',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2e2e2e',
      },
      headerLeft: (
        <Button onPress={params.goBack} link linkColor={Colors.white} iconStyle={{marginLeft: 8, width: 20, height: 20}} iconSource={backIcon} />
      ),
      headerRight: (
        <Button onPress={params.logoutAdmin} link linkColor={Colors.white} label="Logout" labelStyle={{marginRight: 8}} />
      )
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Toast
            message={this.state.toastMessage}
            allowDismiss
            onDismiss={() => this.setState({showToast: false, toastMessage: ''})}
            visible={this.state.showToast} />
          <ScrollView
            horizontal
            height={100}
            style={{marginBottom: 20, padding: 10}}
            showsHorizontalScrollIndicator={false}>
            <Card shadowType="white10" key={0} width={100} containerStyle={{marginRight: 20}}>
              <View padding-15>
                <Text center text50 dark30>
                  {this.state.devices}
                </Text>
                <Text center text80 dark30>Installs</Text>
              </View>
            </Card>
          </ScrollView>

          <LiveStreamForm 
            containerStyle={{marginBottom: 20}} 
            onChangeText={this.onChangeLivestreamText}
            onSubmit={this.updateLivestream}/>

          <Card>
            <NotificationForm 
              onChangeTitle={this.onChangeNotificationTitle}
              onChangeBody={this.onChangeNotificationBody}
              onSubmit={this.sendNotification} />
          </Card>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
  },
});

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
