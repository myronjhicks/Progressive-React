import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Container, Header, Title, Left,
    Right, Icon, Button, Text,
    Content, Body, Card, CardItem 
} from 'native-base';

export default class EventsScreen extends Component {
    render() {
        return(
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={this.openDrawer}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Events</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                </Content>
            </Container>
        );
    }
}