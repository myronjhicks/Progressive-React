import React, { Component } from 'react';
import { View, TextInput, TextArea, Text, Button, Colors, Toast } from 'react-native-ui-lib';

export default class NotificationForm extends Component {

  constructor(props){
    super(props);
  }

  submit = () => {
    this.props.onSubmit();
  }

  render() {
    return (
      <View padding-12 bg-white flex-1 style={{height: 250}}>
        <TextInput text50 dark10 
          placeholder="Notification Title" 
          onChangeText={this.props.onChangeTitle}
          ref={element => (this.titleTextInput = element)}/>
        <TextArea  text50 dark10
          placeholder="Notification Body" 
          onChangeText={this.props.onChangeBody}
          ref={element => (this.bodyTextInput = element)}/>
        <Button onPress={this.submit} fullWidth text70 white background-yellow label="Send Now" />
      </View>
    );
  }
}
