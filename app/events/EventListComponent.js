import React from 'react';
import { FlatList } from 'react-native';
import EventCard from '../components/EventCard';
import firebase from '../config/firebase';

export default class EventListComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        var events = [];
        firebase.firestore().collection('events').get().then((querySnap) => {
            querySnap.forEach((snap) => {
                events.push({
                    key: snap.id,
                    ...snap.data()
                })
            })
            this.setState(() => this.state.events = events);
        })
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.state.events}
                keyExtractor = {item => item.key}
                renderItem={({item}) => <EventCard event={item} />}
            />
        )
    }
}
