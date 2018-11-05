import React from 'react';
import { Text, View } from 'react-native';
import { Updates, Font, AppLoading, Asset }  from 'expo';
import { Provider } from 'react-redux';
import { RootStack } from './app/index.js';
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

function cacheImages(images) {
  return images.map(image => {
    if(typeof image === 'string') {
      return Image.prefetch(image);
    }else{
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {

  state = {
    isReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./app/assets/video_image.jpg'),
      require('./assets/backdrop.jpg'),
      require('./assets/give.jpg'),
      require('./assets/dates_family.jpg'),
      require('./app/assets/icons/instagram-icon.png'),
      require('./app/assets/icons/facebook-icon.png'),
      require('./app/assets/icons/youtube-icon.png'),
      require('./assets/guide.jpg'),
      require('./assets/outreach.jpg'),
      require('./assets/welcome.jpg'),
      require('./assets/kids.jpg'),
      require('./assets/growth.jpg')
    ]);

    const fontAssets = cacheFonts([
      { RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
      { RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
      { RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
      { RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')}
    ]);

    await Promise.all([...fontAssets, ...imageAssets]);
  }

  render() {
    if(!this.state.isReady){
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn} />
      )
    }
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
            <RootStack />
        </Provider>
      </View>
    );
  }

}
