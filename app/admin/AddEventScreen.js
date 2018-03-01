import React, { Component } from 'react';
import { ScrollView, StyleSheet, Platform, DatePickerIOS } from 'react-native';
import DatePicker from 'react-native-datepicker';
import BackButton from '../components/buttons/BackButton';
import SendButton from '../components/buttons/SendButton';
import { View, TextInput, Text, Button, Colors, Toast, Typography } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import FormInput from '../components/inputs/FormInput';
import FormSwitch from '../components/inputs/FormSwitch';
import { submitEvent } from '../redux/actions/events';

export default class AddEventScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
          title: 'Add Event',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2e2e2e',
          },
          headerLeft: (
            <BackButton onPress={params.goBack} />
          ),
          headerRight: (
            <SendButton onPress={params.saveEvent} />
          )
        }
    };

    constructor(props){
        super(props)
        this.state = {
            title: undefined,
            subtitle: undefined,
            chosenDate: new Date(),
            location: undefined,
            isFeatured: false
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({goBack: this.goBack, saveEvent: this.saveEvent});
        let params = this.props.navigation.state.params;
        if(params && params.event){
          this.setState({
            title: params.event.title,
            subtitle: params.event.subtitle,
            chosenDate: new Date(params.event.timestamp),
            location: params.event.location,
            isFeatured: false
          });
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    saveEvent = () => {
        if(this.state.title && this.state.location && this.state.chosenDate){
            var subtitle = this.state.subTitle ? this.state.subTitle : '';
            const event = {
                title: this.state.title,
                subtitle: subtitle,
                location: this.state.location,
                timestamp: this.state.chosenDate.getTime()
            };
            submitEvent(event);
        }
    }


    setDate = (newDate) => {
        this.setState({chosenDate: newDate});
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <FormInput placeholder="Title" value={this.state.title} onChangeText={(text) => this.setState({title: text})}/>
                <FormInput placeholder="Sub Title" value={this.state.subtitle} onChangeText={(text) => this.setState({subtitle: text})} />
                <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate} minuteInterval={5} />
                <FormInput placeholder="Location" value={this.state.location} onChangeText={(text) => this.setState({location: text})} />
                <FormSwitch header="Feature" toggle={this.state.isFeatured} onValueChange={(value) => this.setState({isFeatured: value})} />
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 25,
    }
})
