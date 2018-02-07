import React, { Component } from 'react';

import { View, TextInput, Text, Colors, Toast, Card, Button } from 'react-native-ui-lib';

export default class LiveStreamForm extends Component {

    constructor(props){
        super(props);
    }

    submit = () => {
        this.props.onSubmit();
        this.eventTextInput.clear();
    }

    render(){
        return (
            <Card containerStyle={this.props.containerStyle}>
                <View padding-12 bg-white flex-1 style={{height: 180}}>
                    <Text centerH center black text50 marginB-10>Update LiveStream</Text>
                    <TextInput text50  placeholder="Event ID" dark10 
                        onChangeText={this.props.onChangeText} 
                        ref={element => (this.eventTextInput = element)}/>
                    <Button onPress={this.submit} fullWidth text70 white background-yellow label="Update" />
                </View>
            </Card>
        );
    }
}