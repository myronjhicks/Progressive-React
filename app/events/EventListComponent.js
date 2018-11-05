import React from 'react';
import { FlatList } from 'react-native';
import EventCard from '../components/EventCard';
import { connect } from 'react-redux';

class EventListComponent extends React.Component {

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.events}
                keyExtractor = {item => item.key}
                renderItem={({item}) => <EventCard event={item} />}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.events
    };
};

export default connect(mapStateToProps)(EventListComponent);