import React, { Component } from 'react';
import Tabs from 'antd-mobile/lib/tabs';
import ConnectScreen from './ConnectScreen';
import EventListComponent from '../events/EventListComponent';
import { connect } from 'react-redux';
import { fetchDiscipleshipHourCourses } from '../redux/actions/courses';

const tabs = [
    { title: 'Community' },
    { title: 'Events' }
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
        this._showPastorsBlog = this._showPastorsBlog.bind(this);
        this._showPrayerWall = this._showPrayerWall.bind(this);
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    _showPastorsBlog = () => {
        this.props.navigation.navigate('Blog');
    };

    _showPrayerWall = () => {
        this.props.navigation.navigate('PrayerWall');
    };

    render() {
        this.events = this.props.events.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });
        return (
            <Tabs tabs={tabs} initialPage={1}
                tabBarUnderlineStyle={{backgroundColor: lightGray}}
                tabBarActiveTextColor={black}
                tabBarInactiveTextColor={lightGray}
                animated={false} useOfPan={false}>
                <ConnectScreen 
                    courses={this.props.courses} 
                    showPrayerWall={this._showPrayerWall} 
                    showPastorsBlog={this._showPastorsBlog} />
                <EventListComponent events={this.events} />
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses,
        events: state.events,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCourses: () => dispatch(fetchDiscipleshipHourCourses()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectTab);