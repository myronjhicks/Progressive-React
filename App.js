import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import { Permissions, Notifications, Util, Font, AppLoading }  from 'expo';
import { Provider } from 'react-redux';
import { Root } from './app/index.js';
import configureStore from './app/redux/store/configureStore';
import { subscribeToAuthState } from './app/redux/actions/authentication';

const store = configureStore();
store.dispatch(subscribeToAuthState());

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    Util.addNewVersionListenerExperimental(() => {
      Alert.alert(
          'An Update is Available',
          'Reload the app to take advantage of the latest improvements',
          [
              {text: 'Don\'t reload right now', onPress: () => {}, style: 'cancel'},
              {text: 'Yes, reload and update', onPress: () => { Util.reload(); } },
          ],
          { cancelable: false },
      );
    });
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading) {
      return (
          <AppLoading />
      );
    }
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
            <Root></Root>
        </Provider>
      </View>
    );
  }

}
