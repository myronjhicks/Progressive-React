import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
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
