import React, { Component } from 'react';
import { Button, Colors } from 'react-native-ui-lib';

const backIcon = require('../../assets/icons/chevron_back.png');

export default class BackButton extends Component {

    constructor(props){
      super(props);
    }

    render() {
        return (
            <Button onPress={this.props.onPress} link linkColor={Colors.white} iconStyle={{marginLeft: 8, width: 20, height: 20}} iconSource={backIcon} />
        )
    }
}