import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import { View, TextInput, Text, Colors, Toast, Card, Button } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import EventCard from '../components/EventCard';
import BackButton from '../components/buttons/BackButton';
import AddButton from '../components/buttons/AddButton';

class CalendarScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
          title: 'Calendar',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#2e2e2e',
          },
          headerLeft: (
            <BackButton onPress={params.goBack} />
          ),
          headerRight: (
              <AddButton onPress={params.goToAdd} />
          )
        }
    };

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.navigation.setParams({goBack: this.goBack, goToAdd: this.goToAdd});
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    goToAdd = () => {
        this.props.navigation.navigate('AddEventScreen');
    }

    render() {
        this.events = this.props.events.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });
        return (
            <FlatList 
                data={this.events}
                keyExtractor = {item => item.key}
                renderItem={({item}) => <EventCard event={item} />}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
    };
};

export default connect(mapStateToProps)(CalendarScreen);