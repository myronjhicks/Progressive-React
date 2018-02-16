import React, { Component } from 'react';
import { Button, Colors } from 'react-native-ui-lib';

const plusIcon = require('../../assets/icons/plus.png');

export default class AddButton extends Component {

    constructor(props){
        super(props);
      }
  
      render() {
          return (
              <Button onPress={this.props.onPress} link linkColor={Colors.white} iconStyle={{marginRight: 8, width: 30, height: 30}} iconSource={plusIcon} />
          )
      }
}