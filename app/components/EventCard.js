import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Icon,
    Button,
    Text,
    Body,
    Card,
    CardItem
} from 'native-base';
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

export default class EventCard extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const event = this.props.event;
    return (
          <Card>
              <CardItem>
                  <Body>
                      <View style={{flex: 1, flexDirection: 'row', height: 80}}>
                          <View style={{minWidth: 80, borderWidth: 2, borderColor: '#c6ac71', marginRight: 4}}>
                              <Text style={{fontSize: 14, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{MONTHS[moment(event.date).month()]}</Text>
                              <Text style={{fontSize: 22, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{moment(event.date).date()}</Text>
                              <Text style={{fontSize: 14, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{WEEKDAYS[moment(event.date).day()]}</Text>
                          </View>
                          <View style={{flexGrow: 1}}>
                              <Text style={{fontWeight: 'bold', margin: 2, fontSize: 20}}>{event.title}</Text>
                              <Text style={{color: '#404040', marginBottom: 10, marginLeft: 2, fontSize: 14}}>{event.info}</Text>
                              <Text style={{marginLeft: 2, fontSize: 14, color: '#404040'}}>{event.time}</Text>
                          </View>
                      </View>
                  </Body>
              </CardItem>
          </Card>
    );
  }
}
