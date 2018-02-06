import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text, Colors, Toast, Card, Button } from 'react-native-ui-lib';
import { logout } from '../redux/actions/authentication';
import { ScrollView, StyleSheet } from 'react-native';
import firebase from '../config/firebase';
import { Icon } from 'native-base';
import NotificationForm from '../components/NotificationForm';

const backIcon = require('../assets/icons/chevron_back.png');

const LiveStreamInput = () => {
  return (
    <View padding-12 bg-white flex-1 style={{height: 180}}>
      <Text centerH center black text50 marginB-10>Update LiveStream</Text>
      <TextInput text50  placeholder="Event ID" dark10 />
      <Button fullWidth text70 white background-yellow label="Update" />
    </View>
  );
}

class AdminScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      devices: 0,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({loggedIn: this.props.auth.loggedIn, logoutAdmin: this.logout, goBack: this._handleCancel});
    firebase.database().ref('deviceTokens')
      .once('value')
      .then(function(snapshot){
        return snapshot.numChildren();
      }).then(devices => this.setState({devices}));
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
          <Card containerStyle={{marginBottom: 20}}>
            <LiveStreamInput />
          </Card>
          <Card>
            <NotificationForm />
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
