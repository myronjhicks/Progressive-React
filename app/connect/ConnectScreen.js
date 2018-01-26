import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image';
import { List, ListItem } from 'react-native-elements';
import {
    Container, Header, Title, Left,
    Right, Icon, Button, Text,
    Content, Body, Card, CardItem 
} from 'native-base';
import { connect } from 'react-redux';
import { fetchDiscipleshipHourCourses } from '../redux/actions/courses';
import firebase from '../config/firebase';
import moment from 'moment';

const WEEKDAYS = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
};

const MONTHS = {
    0: "JAN", 1: "FEB", 2: "MAR", 3: "APR",
    4: "MAY", 5: "JUN", 6: "JUL", 7: "AUG",
    8: "SEP", 9: "OC", 10: "NOV", 11: "DEC"
}

class ConnectScreen extends Component {

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

    constructor(props) {
        super(props);
        this.dbRef = firebase.database().ref('events');
        this.unsubscribe = null;
        this.state = {
            events: [],
        }
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    componentWillMount() {
        this.unsubscribe = this.dbRef.orderByChild('date').on('value', this.onRefUpdate);
    }

    componecomponentWillUnmount() {
        this.unsubscribe();
    }

    onRefUpdate = (snapshot) => {
        const events = [];
        snapshot.forEach( (childSnapshot) => {
            const data = childSnapshot.val();
            var momentDate = new Date(data.date);
            if(moment(momentDate).isAfter(moment())){
                events.push({
                    key: childSnapshot.key,
                    date: momentDate,
                    title: data.title,
                    time: data.time,
                    info: data.info,
                });
            }
        });

        this.setState({
            events: events
        });
    }

    _showAnnouncements = () => {
        this.props.navigation.navigate('Notifications');
    };

    _showPrayerWall = () => {
        this.props.navigation.navigate('PrayerWall');
    };


    _renderItem = ({item}) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 8,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{textAlign: 'center'}}>{item.description}</Text>
            </View>
        );
    };

    _renderEvent = ({item}) => {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Body>
                            <View style={{flex: 1, flexDirection: 'row', height: 80}}>
                                <View style={{minWidth: 80, borderWidth: 2, borderColor: '#c6ac71', marginRight: 4}}>
                                    <Text style={{fontSize: 14, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{MONTHS[moment(item.date).month()]}</Text>
                                    <Text style={{fontSize: 22, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{moment(item.date).date()}</Text>
                                    <Text style={{fontSize: 14, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{WEEKDAYS[moment(item.date).day()]}</Text>
                                </View>
                                <View style={{flexGrow: 1}}>
                                    <Text style={{fontWeight: 'bold', margin: 2, fontSize: 20}}>{item.title}</Text>
                                    <Text style={{color: '#404040', marginBottom: 10, marginLeft: 2, fontSize: 14}}>{item.info}</Text>
                                    <Text style={{marginLeft: 2, fontSize: 14, color: '#404040'}}>{item.time}</Text>
                                </View>
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    };

    render() {

        return (
            <Container>
                <Content>
                <View 
                    style={{
                        flex: 1,
                        height: 100,
                        flexDirection: 'row'
                    }}>
                            <Card style={{backgroundColor: '#29575f'}}>
                                <TouchableOpacity onPress={_ => this._showPrayerWall()}>
                                    <CardItem>
                                        <Body>
                                            <Text>Prayer Wall</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableOpacity>
                            </Card>
                        <Card style={{backgroundColor: '#660000'}}>
                            <TouchableOpacity onPress={_ => this._showAnnouncements()}>
                                <CardItem>
                                    <Body>
                                        <Text>Announcements</Text>
                                    </Body>
                                </CardItem>
                            </TouchableOpacity>
                        </Card>
                    </View>

                    <View>
                        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#2e2e2e', height: 40, marginBottom: 10}}>
                            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>DISCIPLESHIP HOUR</Text>
                        </View>
                        <View>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text>Progressive offers topical Discipleship classes as well as traditional quarterly classes to meet the generationally diverse needs of our congregation. A variety of classes meet  between the Worship Services each Sunday at 9:45am.</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <View>
                                <FlatList
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column'
                                    }}
                                    automaticallyAdjustContentInsets={false}
                                    data={this.props.courses}
                                    keyExtractor = {item => item.id}
                                    renderItem={this._renderItem}
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#2e2e2e', height: 40}}>
                            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>UPCOMING EVENTS</Text>
                        </View>
                        <View>
                            <FlatList
                                automaticallyAdjustContentInsets={false}
                                data={this.state.events}
                                keyExtractor = {item => item.key}
                                renderItem={this._renderEvent}
                            />
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return { 
        courses: state.courses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCourses: () => dispatch(fetchDiscipleshipHourCourses()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectScreen);
