import React, { Component } from 'react';
import { StyleSheet, FlatList, Linking } from 'react-native';
import { Container, Header, Title, Body, Left, Right, Text, Content } from 'native-base';
import { List, ListItem } from 'react-native-elements';

export default class MoreListView extends Component {

    openUrl = (url) => {
        Linking.openUrl(url);
    };

    routeTo = ({item}) => {
        if(item.route) {
            this.props.navigation.navigate(item.route)
        }else{
            Linking.canOpenURL(item.url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(item.url)
                            .catch(() => null);
                    }
            });
        }
    };

    render() {
        const routes = [
            {id: 1, title: "About", route: 'About', icon: 'info-outline'},
            {id: 3, title: "What We Believe", route: 'Believe', icon: 'info-outline'},
            {id: 4, title: "Our History", route: 'History', icon: 'highlight'},
            {id: 5, title: "Give", route: 'Give', icon: 'attach-money'},
            {id: 6, title: "Update Membership Info", url: 'https://docs.google.com/forms/d/e/1FAIpQLSdMDkN5ETQRDEQ0xmdkSqbEBKmrYOiVPks6LZ8kA3S3yxSj2A/viewform', icon: 'info'},
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
                                onPress={_ => this.routeTo({item})}
                            />
                        )}
                    />
                </Content>
            </Container>
        );
    }
}