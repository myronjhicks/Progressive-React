import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text, Colors, Toast, Card, Button } from 'react-native-ui-lib';
import { logout } from '../redux/actions/authentication';
import { ScrollView, StyleSheet, Alert, FlatList, Dimensions, Image } from 'react-native';
import firebase from '../config/firebase';
import { NavigationActions } from 'react-navigation';
import BackButton from '../components/buttons/BackButton';

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;
const itemHeight = (height) / 6;

const actions = [
  {
    key: 1,
    name: 'Notification',
    image: require('../assets/icons/send_notification.png'),
    path: 'NotificationScreen',
  },
  {
    key: 2,
    name: 'Calendar',
    image: require('../assets/icons/calendar.png'),
    path: 'CalendarScreen',
  },
  {
    key: 3,
    name: 'Videos',
    image: require('../assets/icons/videos.png'),
    path: 'LiveStreamVideoForm',
  },
  {
    key: 4,
    name: 'Corporate',
    image: require('../assets/icons/corporate.png'),
    path: 'Corporate',
  }
];

class AdminScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      devices: 0,
      iosCount: 0,
      androidCount: 0,
      livestreamID: '',
      showToast: false,
      toastMessage: '',
      actions: [],
    }
    this.updateLivestream = this.updateLivestream.bind(this);
    this.onChangeLivestreamText = this.onChangeLivestreamText.bind(this);
    this.routeTo = this.routeTo.bind(this);
  }


  componentDidMount() {
    this.props.navigation.setParams({loggedIn: this.props.auth.loggedIn, logoutAdmin: this.logout, goBack: this._handleCancel});
    firebase.database().ref('deviceTokens')
      .once('value')
      .then(function(snapshot){
        let stats = {};
        var ios = 0;
        var android = 0;
        stats.devices = snapshot.numChildren();
        snapshot.forEach(function(snap){
          var data = snap.val();
          if(data.platform){
            if(data.platform == 'ios'){
              ios++;
            }else{
              android++;
            }
          }
        });
        stats.ios = ios;
        stats.android = android;
        return stats;
      }).then((stats) => {
        this.setState({
          devices: stats.devices,
          iosCount: stats.ios,
          androidCount: stats.android,
          actions: actions
        });
      }).catch(error => console.log(error));
  }

  routeTo = ({item}) => {
    this.props.navigation.navigate(item.path);
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

  _handleCancel = () => {
    this.props.navigation.dispatch(NavigationActions.back())
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
        <BackButton onPress={params.goBack} />
      ),
      headerRight: (
        <Button onPress={params.logoutAdmin} link linkColor={Colors.white} label="Logout" labelStyle={{marginRight: 8}} />
      )
    }
  };

  renderStats = () => {
    return (
      <ScrollView
            horizontal
            height={100}
            style={{marginLeft: 5, marginBottom: 20, padding: 10, marginTop: 5}}
            showsHorizontalScrollIndicator={false}>
            <Card shadowType="white10" key={0} width={100} containerStyle={{marginRight: 20}}>
              <View padding-15>
                <Text center text50 dark30>
                  {this.state.devices}
                </Text>
                <Text center text80 dark30>Installs</Text>
              </View>
            </Card>
            <Card shadowType="white10" key={1} width={100} containerStyle={{marginRight: 20}}>
              <View padding-15>
                <Text center text50 dark30>
                  {this.state.iosCount}
                </Text>
                <Text center text80 dark30>iOS</Text>
              </View>
            </Card>
            <Card shadowType="white10" key={2} width={100} containerStyle={{marginRight: 20}}>
              <View padding-15>
                <Text center text50 dark30>
                  {this.state.androidCount}
                </Text>
                <Text center text80 dark30>Android</Text>
              </View>
            </Card>
          </ScrollView>
    );
  }

  renderFooter = () => {
    return (
      <View padding-15>
        <Text center text50 dark30>

        </Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={this.state.actions}
          numColumns={2}
          ListHeaderComponent={this.renderStats}
          ListFooterComponent={this.renderFooter}
          renderItem={({item}) => (
            <Card shadowType="white10" key={item.key} width={itemWidth}
              height={itemHeight} containerStyle={{margin: 15}}
              onPress={_ => this.routeTo({item})}>
              <View padding-15 centerH>
                <Image source={item.image} style={{height: 40, width: 40, marginBottom: 10}} />
                <Text center text50 dark30>
                  {item.name}
                </Text>
              </View>
            </Card>
          )}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
