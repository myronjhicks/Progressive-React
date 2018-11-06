import React, { Component } from 'react';
import Tabs from 'antd-mobile-rn/lib/tabs';
import EventListComponent from '../events/EventListComponent';
import { connect } from 'react-redux';
import VideosContainer from '../videos/VideosContainer';

const tabs = [
    { title: 'Events' },
    { title: 'Sermons' }
];

const lightGray = '#ccc';
const black = 'black';

class ConnectTab extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Connect',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
    };

    constructor(props){
        super(props);
        this._showEventDetail = this._showEventDetail.bind(this);
        this._showVideoDetail = this._showVideoDetail.bind(this);
    }

    _showEventDetail(event) {
        this.props.navigation.push('EventDetail', { ...event });
    }

    _showVideoDetail(video) {
        this.props.navigation.push('VideoDetail', { ...video });
    }

    render() {
        return (
            <Tabs tabs={tabs} initialPage={1}
                tabBarUnderlineStyle={{backgroundColor: lightGray}}
                tabBarActiveTextColor={black}
                tabBarInactiveTextColor={lightGray}
                animated={false} useOfPan={false}>
                <EventListComponent events={this.props.events} onShowEvent={this._showEventDetail} />
                <VideosContainer showHeaderImage={true} onShowVideo={this._showVideoDetail}/>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        videos: state.videos
    };
};

export default connect(mapStateToProps)(ConnectTab);