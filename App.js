import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { Asset, AppLoading } from 'expo';
import { Root } from './app/index.js';
import configureStore from './app/redux/store/configureStore';

const store = configureStore();

export default class App extends Component {

  constructor() {
    super();
    this.state = { isReady: false };
  }


  async componentWillMount() {

    await Expo.Font.loadAsync({ 
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          });
    this.setState({ isReady: true });
  }


  render() {

    return (
      <Provider store={store}>
          <Root></Root>
      </Provider>
    );
  }

}
