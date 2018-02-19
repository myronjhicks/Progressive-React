import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Tabs from 'antd-mobile/lib/tabs';
import { connect } from 'react-redux';
import { chapterFetchData } from '../redux/actions/chapter';
import BooksList from './BooksList';
import ChapterNumberGrid from './ChapterNumberGrid';
import DownButton from '../components/buttons/DownButton';

const tabs = [
    { title: 'Book' },
    { title: 'Chapter' }
];

const lightGray = '#ccc';
const black = 'black';

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
                <DownButton onPress={params.goBack} />
            )
        }
      };

    constructor(props) {
        super(props);
        this.state = {
            selectedTabIndex: 0,
            navigationTitle: 'Book',
            selectedBook: this.props.books[0]
        };
        this._onChapterPress = this._onChapterPress.bind(this);
        this._selectChapterAndDismiss = this._selectChapterAndDismiss.bind(this);
    };

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._handleCancel, title: this.state.selectedBook.name});
    }

    _handleCancel = () => {
        this.props.navigation.goBack();
    };

    _onChapterPress = ({item}) => {
        var newState = {
            selectedTabIndex: 1,
            navigationTitle: item.name,
            selectedBook: item
        };
        this.setState(newState);
    };

    _selectChapterAndDismiss = ({item}) => {
        this.props.fetchChapter(item.id);
        this.props.navigation.goBack();
    };

    _onTabClick = (tab) => {
        if(tab.title === "Chapter") {
            this.setState({selectedTabIndex: 1});
        }else{
            this.setState({selectedTabIndex: 0});
        }
    }

    render() {
        return (
            <Tabs tabs={tabs} 
                initialPage={0} 
                page={this.state.selectedTabIndex}
                onTabClick={this._onTabClick}
                tabBarUnderlineStyle={{backgroundColor: lightGray}}
                tabBarActiveTextColor={black}
                tabBarInactiveTextColor={lightGray}
                animated={false} useOfPan={false}>
                <BooksList books={this.props.books} onBookSelected={this._onChapterPress} />
                <ChapterNumberGrid chapters={this.state.selectedBook.chapters} onChapterSelected={this._selectChapterAndDismiss} />
            </Tabs>
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
