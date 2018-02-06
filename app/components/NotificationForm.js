import React, { Component } from 'react';
import { View, TextInput, TextArea, Text, Button, Colors, Toast } from 'react-native-ui-lib';

export default class NotificationForm extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View padding-12 bg-white flex-1 style={{height: 250}}>
        <Text centerH center black text50 marginB-10>Send Notification</Text>
        <TextInput text50  placeholder="title" dark10 />
        <TextArea  text50  placeholder="body" dark10 />
        <Button fullWidth text70 white background-yellow label="Send Now" />
      </View>
    );
  }
}
