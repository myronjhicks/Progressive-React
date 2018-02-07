import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base'
import { View, TextInput, Text, Button, Colors, Toast } from 'react-native-ui-lib';
const { width, height } = Dimensions.get('window');
import { singInWithEmailAndPass } from '../redux/actions/authentication';
import firebase from '../config/firebase';

Colors.loadColors({
  yellow: '#C6AC71',
});

const backIcon = require('../assets/icons/chevron_back.png');

class LoginScreen extends Component {

  constructor(props){
    super(props)
    this.state = {email: '', password: '', showToast: false};
    this.setPassword = this.setPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.login = this.login.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Login',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2e2e2e',
      },
      headerLeft: (
        <Button onPress={params.goBack} link linkColor={Colors.white} iconStyle={{marginLeft: 8, width: 20, height: 20}} iconSource={backIcon} />
      ),
    }
  };

  componentDidMount() {
    this.setState({showToast: false});
    this.props.navigation.setParams({goBack: this._handleCancel});
  }

  componentWillReceiveProps(props) {
    const auth = props.auth;
    if (auth.loggedIn == true) {
      this._handleCancel();
    } else if (auth.error){
      this.setState({
        showToast: true
      });
    }
  }

  _handleCancel = () => {
    this.props.navigation.goBack();
  };

  setPassword = (text) => {
    this.setState({password: text});
  }

  setEmail = (text) => {
    this.setState({email: text});
  }

  login = () => {
    const email = this.state.email;
    const pass = this.state.password;
    this.props.signInWithEmailAndPass(email, pass);
  }

  render() {
    const invalid = (this.state.email == '') || (this.state.password == '');
    const errorMessage = this.props.auth.error ? this.props.auth.error.message : '';
    return(
      <View flex paddingH-25 paddingT-120>
        <Toast
            message={errorMessage}
            allowDismiss
            onDismiss={() => this.setState({showToast: false})}
            visible={this.state.showToast} />
        <Text black text20 marginB-10>Welcome</Text>
        <TextInput text50 placeholder="email" dark10
          autoCapitalize='none'
          onChangeText={this.setEmail}/>
        <TextInput text50 placeholder="password" secureTextEntry dark10
          onChangeText={this.setPassword}/>
        <View marginT-100 center>
          <Button text70 white background-yellow label="Login"
            onPress={this.login}
            disabled={invalid}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInWithEmailAndPass: (email, pass) => dispatch(singInWithEmailAndPass(email,pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
