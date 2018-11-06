import React from 'react';
import { StatusBar, StyleSheet, View, ScrollView, Dimensions, WebView, SafeAreaView } from 'react-native';
import { Text, ListItem, Body, Button } from 'native-base';
import moment from 'moment';

export default class EventDetail extends React.Component {
    static navigationOptions = {
        headerRight: (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      };

    constructor(props){
        super(props);
    }
    
    render() {
        const { key, date, name, location, description } = this.props.navigation.state.params;
        return (
            <ScrollView>
                <ListItem>
                    <Body>
                        <Text>{name}</Text>
                        <Text note>{moment(date).format('MMM DD, YYYY')}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text note>Description</Text>
                        <Text>{description}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text>Published</Text>
                        <Text note>{moment(date).format('MMM DD, YYYY')}</Text>
                    </Body>
                </ListItem>
            </ScrollView>
        );
    }
}