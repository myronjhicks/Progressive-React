import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import { Permissions, Notifications, Util, Font, AppLoading }  from 'expo';
import { Provider } from 'react-redux';
import { Root } from './app/index.js';
import configureStore from './app/redux/store/configureStore';
import { subscribeToAuthState } from './app/redux/actions/authentication';
import { listenToEvents } from './app/redux/actions/events';
import { listenToLivestream } from './app/redux/actions/livestream';
import { listenToAnnouncements } from './app/redux/actions/announcements';
import { listenToPrayers } from './app/redux/actions/prayers';
import { listenToVideos } from './app/redux/actions/videos';
import { listenToBlogs } from './app/redux/actions/blogPosts';
import { chapterFetchData } from './app/redux/actions/chapter';
import { fetchBooks } from './app/redux/actions/books';

const store = configureStore();
store.dispatch(fetchBooks());
store.dispatch(chapterFetchData('eng-NASB_Gen.1'));
store.dispatch(subscribeToAuthState());
store.dispatch(listenToEvents());
store.dispatch(listenToLivestream());
store.dispatch(listenToAnnouncements());
store.dispatch(listenToPrayers());
store.dispatch(listenToVideos());
store.dispatch(listenToBlogs());

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

  componentDidMount() {
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
