import React, { Component } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import BackButton from '../components/BackButton';

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
        }
    };

    constructor(props){
        super(props)
        this.state = { date: new Date() }
    }

    componentDidMount(){
        this.props.navigation.setParams({goBack: this.goBack});
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="datetime"
                placeholder="select date"
                format="MMMM Do YYYY, h:mm a"
                minDate="2018-01-01"
                maxDate="2019-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 0
                }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />
        );
    }
}