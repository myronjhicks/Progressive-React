import React from 'react';
import { View } from 'react-native';
import {
    Text,
    Body,
    Card,
    Right,
    ListItem,
    Button,
    Left,
} from 'native-base';
import moment from 'moment-timezone';

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

export default class EventCard extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const event = this.props.event;
    const date = new Date(moment.unix(event.date.seconds));
    return (
          <Card>
              <ListItem thumbnail>
                <Left>
                    <View style={{minWidth: 80, borderWidth: 2, borderColor: '#c6ac71', marginRight: 4}}>
                        <Text style={{fontSize: 14, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{MONTHS[moment(date).month()]}</Text>
                        <Text style={{fontSize: 22, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{moment(date).date()}</Text>
                        <Text style={{fontSize: 14, marginTop: 2, marginBottom: 2, textAlign: 'center'}}>{WEEKDAYS[moment(date).day()]}</Text>
                    </View>
                </Left>
                <Body>
                    <Text style={{fontWeight: 'bold', margin: 2, fontSize: 16}}>{event.name}</Text>
                    <Text style={{color: '#404040', marginBottom: 10, marginLeft: 2, fontSize: 14}}>{event.location}</Text>
                    <Text style={{marginLeft: 2, fontSize: 14, color: '#404040'}}>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={_ => this.props.onPress(event)}>
                        <Text>View</Text>
                    </Button>
                </Right>
              </ListItem>
          </Card>
    );
  }
}
