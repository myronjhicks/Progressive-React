import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Expo, AppLoading, Font } from "expo";
import { Root } from './app/index.js';
import configureStore from './app/redux/store/configureStore';

const store = configureStore();

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
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content'/>
        <Provider store={store}>
            <Root></Root>
        </Provider>
      </View>
    );
  }

}
