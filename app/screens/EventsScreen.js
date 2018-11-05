import React, { Component } from 'react';
import {
    Container, Header, Title, Left,
    Right, Icon, Button,
    Content, Body
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