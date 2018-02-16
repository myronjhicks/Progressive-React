import React, { Component } from 'react';
import { Button, Colors } from 'react-native-ui-lib';

const sendIcon = require('../../assets/icons/sendIcon.png');

export default class SendButton extends Component {

    constructor(props){
        super(props);
      }
  
      render() {
          return (
              <Button onPress={this.props.onPress} link linkColor={Colors.white} iconStyle={{marginRight: 8, width: 30, height: 30}} iconSource={sendIcon} />
          )
      }
}