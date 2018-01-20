import * as moment from 'moment';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, FlatList } from 'react-native';
import {
    Text,
    Body, 
    Card, 
    Container,
    Content,
    CardItem 
} from 'native-base';
import firebase from '../config/firebase';
import { connect } from 'react-redux';
import { fetchAnnouncements } from '../redux/actions/announcements';

class AnnouncementsScreen extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
       this.props.fetchAnnouncements();
    }

    _renderItem = ({item}) => {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{fontSize: 16,}}>{item.text}</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>{moment.unix(item.timestamp).fromNow()}</Text>
                    </CardItem>
                </Card>
            </View>
        );
    };

    render() {
        if(this.props.isLoading) {
            return(<View></View>);
        }else{
            return(
                <FlatList
                    automaticallyAdjustContentInsets={false}
                    data={this.props.announcements}
                    keyExtractor = {item => item.key}
                    renderItem={this._renderItem}
                />
            );
        }
    }
}

const styles = StyleSheet.create({ });

const mapStateToProps = (state) => {
    return { 
        announcements: state.announcements,
        isLoading: state.announcementsIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnnouncements: () => dispatch(fetchAnnouncements()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsScreen);