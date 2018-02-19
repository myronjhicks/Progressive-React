import React, { Component } from 'react';
import { FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image';
import { List, ListItem } from 'react-native-elements';
import { Container, Button, Content, Body, Card, CardItem } from 'native-base';
import { View, Text } from 'react-native-ui-lib';
export default class ConnectScreen extends Component {

    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => {
        return (
            <View style={styles.courseContainer}>
                <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{textAlign: 'center'}}>{item.description}</Text>
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
                                <TouchableOpacity onPress={this.props.showPrayerWall}>
                                    <CardItem>
                                        <Body>
                                            <Text>Prayer Wall</Text>
                                        </Body>
                                    </CardItem>
                                </TouchableOpacity>
                            </Card>
                        <Card style={{backgroundColor: '#660000'}}>
                            <TouchableOpacity onPress={this.props.showPastorsBlog}>
                                <CardItem>
                                    <Body>
                                        <Text>{"Pastor's Desk"}</Text>
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
});
