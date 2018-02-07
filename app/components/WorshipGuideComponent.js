import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';
import { Button, Icon } from 'native-base';
import firebase from '../config/firebase';

export default class WorshipGuideComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            guideUrl: ''
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Membership Guide',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
              <Button light transparent onPress={params.goBack}>
                  <Icon name="arrow-back" size={24} />
              </Button>
          )
        }
      };

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel});
        firebase.storage().ref('guides').child('WorshipGuide.pdf').getDownloadURL().then(url => {
            this.setState({
                guideUrl: url
            })
        });
    }

    _handleCancel = () => {
        this.props.navigation.goBack();
      };

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    bounces={false}
                    scrollEnabled={false} 
                    source={{ uri: this.state.guideUrl }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});