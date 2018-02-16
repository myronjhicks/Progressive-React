import React, { Component } from 'react';
import { Button, Colors } from 'react-native-ui-lib';

const bellIcon = require('../../assets/icons/bell.png');

export default class NotificationButton extends Component {

    constructor(props){
      super(props);
    }

    render() {
        return (
            <Button onPress={this.props.onPress} link linkColor={Colors.white} iconStyle={{marginRight: 8, width: 20, height: 20}} iconSource={bellIcon} />
        )
    }
}