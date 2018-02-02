import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TextInput} from 'react-native';
import { Left, Right, Container, Content, Body, Item, Input, Text, Button, Card, CardItem} from 'native-base';
import moment from 'moment';
import Image from 'react-native-scalable-image';
import EmptyPrayerList from './EmptyPrayerList';
import { connect } from 'react-redux';
import { submitPrayer } from '../redux/actions/prayers';
import ClapButton from '../components/ClapButton';

class PrayerWallScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Connect',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(props){
        super(props);
        this.state = {
            prayer: '',
            name: '',
        }
        this.prayers = [];
    }

    _onChangePrayerText = (prayerText) => {
        this.setState({
            prayer: prayerText
        });
    };

    _onChangeNameText = (nameText) => {
        this.setState({
            name: nameText
        });
    };

    _onSubmitPrayer = () => {
        if(this.state.prayer){
            const prayerData = {
              name: this.state.name,
              content: this.state.prayer,
              date: Date.now()
            };
            submitPrayer(prayerData);
            this.nameTextInput.clear();
            this.prayerTextInput.clear();
        }
    };

    _keyExtractor = (item, index) => item.key;

    _renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerTitleText}>The PBC Prayer Wall</Text>
                    <Text style={styles.headerSubtitleText}>How can we pray for you?</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.prayerInput}
                        placeholder="Post a Prayer ..."
                        placeholderTextColor="#A9A9A9"
                        multiline={true}
                        onChangeText={this._onChangePrayerText}
                        ref={input => { this.prayerTextInput = input }}
                    />
                    <TextInput
                        style={styles.nameInput}
                        placeholder="Your Name"
                        placeholderTextColor="#A9A9A9"
                        onChangeText={this._onChangeNameText}
                        ref={input => { this.nameTextInput = input }}
                    />
                    <Button style={styles.submitButton} full onPress={this._onSubmitPrayer}>
                        <Text>Post to Wall!</Text>
                    </Button>
                </View>
            </View>
        );
    };

    _renderItem = ({item}) => {
        return (
            <Card>
                <View>
                  <CardItem>
                      <Body>
                          <Text>{item.content}</Text>
                      </Body>
                  </CardItem>
                  <CardItem footer>
                      <Left><Text>{item.name}</Text></Left>
                      <Body><Text>{moment(item.date).format('ll')}</Text></Body>
                      <Right>
                        <Body><Text style={{textAlign: 'right'}}>{item.claps}</Text></Body>
                      </Right>
                  </CardItem>
                  <ClapButton count={item.claps ? item.claps : 0} postKey={item.key}/>
                </View>
            </Card>
        );
    }

    render() {
        if(this.props.prayers.length == 0) {
            return (
                <View>
                    {this._renderHeader()}
                    <EmptyPrayerList />
                </View>
            );
        }
        this.prayers = this.props.prayers.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
        });
        return(
            <FlatList
                data={this.prayers}
                ListHeaderComponent={this._renderHeader}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 300,
        backgroundColor: 'white',
    },
    headerTitleText: {
        margin: 8,
        marginBottom: 4,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    headerSubtitleText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#A9A9A9',
        marginBottom: 8
    },
    prayerInput: {
        height: 120,
        backgroundColor: 'lightgray',
        marginBottom: 8
    },
    nameInput: {
        height: 40,
        backgroundColor: 'lightgray',
        marginBottom: 8
    },
    inputContainer: {
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12
    },
    prayerContainer: {
        height: 150
    },
    submitButton: {
        backgroundColor: '#c6ac71'
    }
});

const mapStateToProps = (state) => {
    return {
        prayers: state.prayers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrayerWallScreen);
