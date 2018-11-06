import React from 'react';
import { FlatList } from 'react-native';
import EventCard from '../components/EventCard';
import { connect } from 'react-redux';

class EventListComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                automaticallyAdjustContentInsets={false}
                data={this.props.events}
                keyExtractor = {item => item.key}
                renderItem={({item}) => <EventCard event={item}  onPress={() => this.props.onShowEvent(item)} />}
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