import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { View, TextInput, Text, Colors, Toast, Card, Button } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import EventCard from '../components/EventCard';
import BackButton from '../components/buttons/BackButton';
import AddButton from '../components/buttons/AddButton';
import Swipeout from 'react-native-swipeout';
import { deleteEventById } from '../redux/actions/events';

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
        this.state = {
            activeRow: null
        };
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

    editEvent(event){
        this.props.navigation.navigate('AddEventScreen', {event: event})
    }

    renderItem(info, activeRow){
        const swipeSettings = {
            autoClose: true,
            close: info.item.key !== this.state.activeRow,
            onClose: (secId, rowId, direction) => this.onSwipeClose(info.item, rowId, direction),
            onOpen: (secId, rowId, direction) => this.onSwipeOpen(info.item, rowId, direction),
            right: [
                { onPress: () => this.onDeleteItem(info.item), text: 'Delete', type: 'delete' }
            ],
            rowId: info.index,
            sectionId: 1
        }
        return (
            <Swipeout { ...swipeSettings }  >
                <TouchableOpacity onPress={_ => this.onSelectItem(info.item)}>
                    <EventCard event={info.item} />
                </TouchableOpacity>
            </Swipeout>
        );
    }

    onSelectItem(item) {
        this.editEvent(item);
    }

    onDeleteItem(item) {
        Alert.alert('Are you sure?', 'This cannot be undone.', [
            {text: 'Delete', onPress: () => {
                deleteEventById(item.key);
            }},
            {text: 'Cancel'}
          ],
          { cancelable: false }
          );
    }

    onSwipeOpen(item, rowId, direction) {
        this.setState({
            activeRow: item.key
        });
    }

    onSwipeClose(item, rowId, direction){
        if(item.key === this.state.activeRow && typeof direction !== 'undefined') {
            this.setState({
                activeRow: null
            });
        }
    }

    render() {
        this.events = this.props.events.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });
        const listSettings = {
            data: this.events,
            extraData: this.state.activeRow,
            keyExtractor: (item, index) => item.key,
            renderItem: (info) => this.renderItem(info, this.state.activeRow)
        };

        return (
            <FlatList {...listSettings} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
    };
};

export default connect(mapStateToProps)(CalendarScreen);
