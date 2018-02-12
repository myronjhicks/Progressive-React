import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Expo, AppLoading, Font } from "expo";
import { Root } from './app/index.js';
import configureStore from './app/redux/store/configureStore';
import { subscribeToAuthState } from './app/redux/actions/authentication';

const store = configureStore();
store.dispatch(subscribeToAuthState());

export default class App extends Component {

  constructor() {
    super();
    this.state = { isReady: false };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          });
    this.setState({ isReady: true });
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
            <Root></Root>
        </Provider>
      </View>
    );
  }

}
