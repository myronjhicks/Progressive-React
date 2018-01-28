import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {
    Container, Header, Title, Left,
    Right, Icon, Button, Text,
    Content, Body, Card, CardItem, Segment
} from 'native-base';
import { connect } from 'react-redux';
import { chapterFetchData } from '../redux/actions/chapter';

const numColumns = 5;
const size = Dimensions.get('window').width/numColumns;
const { width, height } = Dimensions.get('window');
const equalWidth =  (width / 5 );

class ChapterSelector extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: `${params.title ? params.title : ''}`,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
            headerLeft: (
                <Button light transparent onPress={params.goBack}>
                    <Icon name="arrow-down" size={24} />
                </Button>
            )
        }
      };

    constructor(props) {
        super(props);
        this.state = {
            selectedSegmentIndex: 1,
            navigationTitle: 'Book',
            selectedBook: this.props.books[0]
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel, title: this.state.selectedBook.name});
    }

    _handleCancel = () => {
        this.props.navigation.goBack();
    };

    _onChapterPress = (item) => {
        var newState = {
            selectedSegmentIndex: 2,
            navigationTitle: item.name,
            selectedBook: item
        };
        this.setState(newState);
    };

    _selectChapterAndDismiss = (item) => {
        this.props.fetchChapter(item.id);
        this.props.navigation.goBack();
    };

    _onSegmentPress = (index) => {
        var title = index === 1 ? 'Book' : this.state.selectedBook.name;
        var newState = {
            selectedSegmentIndex: index,
            navigationTitle: title,
            selectedBook: this.state.selectedBook
        };
        this.setState(newState);
    };

    renderListView = () => {
        if(this.state.selectedSegmentIndex === 1){
            return this.renderBooksListView();
        }else{
            return this.renderChapterListView();
        }
    };

    _renderChapterView = ({item}) => {
        return (
            <TouchableOpacity onPress={_ => this._selectChapterAndDismiss(item)}>
                <View style={{height: equalWidth, width: equalWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'lightgray', borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: 'lightgray'}}>
                    <Text>{item.chapter}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _renderBookName = ({item}) => {
        return (
            <TouchableOpacity onPress={_ => this._onChapterPress(item)}>
                <View style={{height: 45, paddingLeft: 12, justifyContent: 'center', backgroundColor: 'white', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'lightgray'}}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderChapterListView = () => {
        if(this.state.selectedSegmentIndex === 2){
            return (
                <FlatList
                    key={2}
                    automaticallyAdjustContentInsets={false}
                    data={this.state.selectedBook.chapters}
                    keyExtractor = {item => item.chapter}
                    numColumns={5}
                    renderItem={this._renderChapterView}
                />
            );
        }
    };

    renderBooksListView = () => {
        if(this.state.selectedSegmentIndex === 1) {
            return (
                <FlatList
                    key={1}
                    automaticallyAdjustContentInsets={false}
                    data={this.props.books}
                    keyExtractor = {item => item.ord}
                    renderItem={this._renderBookName}
                />
            );
        }
    };

    render() {
        return (
            <Container>

                <Content>
                    <Segment>
                        <Button
                            first
                            style={{borderColor: 'black', backgroundColor: 'lightgray'}}
                            onPress={_ => this._onSegmentPress(1)}
                            active={this.state.selectedSegmentIndex === 1 ? true : false}>
                            <Text style={{color: 'black'}}>Book</Text>
                        </Button>
                        <Button
                            style={{borderColor: 'black', backgroundColor: 'lightgray'}}
                            last
                            onPress={_ => this._onSegmentPress(2)}
                            active={this.state.selectedSegmentIndex === 2 ? true : false}>
                            <Text style={{color: 'black'}}>Chapter</Text>
                        </Button>
                    </Segment>
                    {this.renderListView()}
                </Content>
            </Container>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        books: state.books,
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChapter: (chapterId) => dispatch(chapterFetchData(chapterId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterSelector);

/**
 * <Header style={{backgroundColor: '#2e2e2e'}}>
                    <Left>
                        <Button transparent onPress={this._handleCancel}>
                            <Text style={{color: 'white'}}>Cancel</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color: 'white'}}>{this.state.navigationTitle}</Text>
                    </Body>
                    <Right />
                </Header>
 */
