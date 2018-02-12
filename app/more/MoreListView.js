import React, { Component } from 'react';
import { StyleSheet, FlatList, Linking } from 'react-native';
import { Container, Header, Title, Body, Left, Right, Text, Content, Button, Icon } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { loginUser, logout } from '../redux/actions/authentication';

class MoreListView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'More',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerRight: ( params.loggedIn &&
                <Button transparent light >
                    <Icon name="log-in" size={24} onPress={params.login}/>
                </Button>
            ),
        }
      };

    constructor(props){
      super(props);
    }

    componentDidMount() {
      this.props.navigation.setParams({login: this.login, logout: this.logout});
    }

    login = () => {
      this.props.navigation.navigate('Login');
    }

    logout = () => {
      this.props.logout();
    }

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
            {id: 9, title: "Membership Guide", route: 'Guide', icon: 'content-copy' },
            {id: 6, title: "Update Membership Info", url: 'https://docs.google.com/forms/d/e/1FAIpQLSdMDkN5ETQRDEQ0xmdkSqbEBKmrYOiVPks6LZ8kA3S3yxSj2A/viewform', icon: 'info'},
            {id: 7, title: "Leave Feedback", route: 'Feedback', icon: 'thumb-up'},
        ];

        if(this.props.auth.loggedIn){
          routes.push({
            id: 8,
            title: "Admin",
            route: "Admin",
            icon: "settings"
          });
        }else{
            routes.push({
                id: 8,
                title: "Admin",
                route: "Login",
                icon: "settings"
              });
        }

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

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreListView);
