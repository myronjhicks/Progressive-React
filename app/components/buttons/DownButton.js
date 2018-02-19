import React, { Component } from 'react';
import { Button, Colors } from 'react-native-ui-lib';

const downIcon = require('../../assets/icons/downIcon.png');

export default class DownButton extends Component {

    constructor(props){
        super(props);
      }
  
      render() {
        return (
            <Button onPress={this.props.onPress} link linkColor={Colors.white} iconStyle={{marginLeft: 8, width: 20, height: 20}} iconSource={downIcon} />
        )
    }
}