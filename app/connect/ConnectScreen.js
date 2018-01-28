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
import EventCard from '../components/EventCard';

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
        this.events = [];
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    _showAnnouncements = () => {
        this.props.navigation.navigate('Notifications');
    };

    _showPrayerWall = () => {
        this.props.navigation.navigate('PrayerWall');
    };

    _renderItem = ({item}) => {
        return (
            <View style={styles.courseContainer}>
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{textAlign: 'center'}}>{item.description}</Text>
            </View>
        );
    };

    render() {
        this.events = this.props.events.sort(function(a,b){
          return new Date(a.date) - new Date(b.date);
        });
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
                                data={this.events}
                                keyExtractor = {item => item.key}
                                renderItem={({item}) => <EventCard event={item} />}
                            />
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  courseContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectScreen);
