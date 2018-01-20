import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Header, Title, Body, Left, Right, Text, Content } from 'native-base';
import { List, ListItem } from 'react-native-elements';

export default class MoreListView extends Component {
    render() {
        const routes = [
            {id: 1, title: "About", route: 'About', icon: 'info-outline'},
            {id: 3, title: "What We Believe", route: 'Believe', icon: 'info'},
            {id: 4, title: "Our History", route: 'History', icon: 'highlight'},
            {id: 5, title: "Give", route: 'Give', icon: 'attach-money'},
            // {id: 6, title: "Share", route: 'Share', icon: 'share'},
            {id: 7, title: "Leave Feedback", route: 'Feedback', icon: 'thumb-up'},
        ];
        return(
            <Container>
                <Content style={{backgroundColor: '#f6f8fa'}}>
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        data={routes}
                        keyExtractor = {item => item.title}
                        renderItem={ ({item}) => (
                            <ListItem
                                key={item.id}
                                title={item.title}
                                leftIcon={{name: item.icon}}
                                onPress={() => this.props.navigation.navigate(item.route)}
                            />
                        )}
                    />
                </Content>
            </Container>
        );
    }
}