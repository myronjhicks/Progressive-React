import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import {
    Container, Header, Title, Left,
    Right, Button, Text, Icon,
    Content, Body, Card, CardItem, Footer, FooterTab
} from 'native-base';
import { connect } from 'react-redux';
import { chapterFetchData } from '../redux/actions/chapter';
import { fetchBooks } from '../redux/actions/books';
import HTMLView from 'react-native-htmlview';
import firebase from '../config/firebase';
import NetworkErrorComponent from '../components/NetworkErrorComponent';

class BibleScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: `${params.headerTitle ? params.headerTitle : ''}`,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(){
        super();
    }

    componentWillMount() {
        this.props.fetchBooks();
        this.props.fetchChapter('eng-NASB_Gen.1');
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.chapter.parent){
            var headerTitle = `${nextProps.chapter.parent.book.name } ${nextProps.chapter.chapter}`
            setTimeout(() => {
                this.props.navigation.setParams({
                    headerTitle: headerTitle,
                });
              }, 1000);
        }
    }

    _nextChapter = () => {
        if(this.props.chapter.next) {
            const nextChapter = this.props.chapter.next.chapter;
            this._scrollToTop();
            this.props.fetchChapter(nextChapter.id);
        }
    };

    _previousChapter = () => {
        if(this.props.chapter.previous) {
            const previousChapter = this.props.chapter.previous.chapter;
            this._scrollToTop();
            this.props.fetchChapter(previousChapter.id);
        }
    };

    _showChapterSelector = () => {
        this.props.navigation.navigate('ChapterSelector');
    };

    _scrollToTop = () => {
        this._content._root.scrollToPosition(0,0,true);
    };

    _footerView = () => {
        return (
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginRight: 8
                }}>
                    <Button
                        rounded={true}
                        transparent
                        onPress={this._previousChapter} 
                        dark>
                        <Icon name='arrow-back' />
                    </Button>
                    <Button dark transparent rounded
                            onPress={this._showChapterSelector}>
                            <Icon name="bookmark" size={24} tintColor={'black'}/>
                    </Button>
                    <Button
                        transparent
                        onPress={this._nextChapter} 
                        dark>
                        <Icon name='arrow-forward' />
                    </Button>
            </View>
        );
    };

    _onRefresh = () => {
        console.log('handle refresh');
    }

    render() {
        const { chapter, hasErrored, isLoading } = this.props;
        if( hasErrored ) { return <NetworkErrorComponent onRefresh={this._onRefresh} /> }
        if( !chapter.text ) { return <View><Text>Loading...</Text></View>; }
            return(
                <Container style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <Content ref={c => this._content = c}>
                    <HTMLView
                        value={chapter.text}
                        stylesheet={styles}
                        addLineBreaks={false}   
                        renderNode={this._renderNode}                 
                    />
                    <View>
                        <Text style={styles.copyright}>{chapter.copyright}</Text>
                    </View>
                </Content>
                <Footer style={{height: 40, backgroundColor: 'transparent'}}>
                    { this._footerView() }
                </Footer>
            </Container>
            );
    }

    _renderNode = (node, index, siblings, parent, defaultRenderer) => {

        if(node.name == 'p') {
            return (
                <Text key={index} style={node.attribs.style}>
                    {'\t'}{defaultRenderer(node.children, parent)}
                </Text>
            );
        }

        if(Platform.OS === 'ios' && node.name == 'sup') {
                return (
                    <View key={index++} style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', width: 14, height: 8}}>
                        <Text key={index} style={{fontSize: 10}}>
                            {defaultRenderer(node.children, parent)}
                        </Text>
                    </View>
                );
        } else if(node.name == 'sup') {
            return (
                <Text key={index} style={{fontSize: 10}}>
                    {defaultRenderer(node.children, parent)}
                </Text>
            )
        }

    };
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: 'white',
    },
    div: {
        marginLeft: 12,
        marginRight: 12,
    },
    header: {
        backgroundColor: '#2e2e2e',
    },
    headerBody: {
        ...Platform.select({
            android: {
                marginTop: 15
            }
        })
    },
    h3: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    p: {
        lineHeight: 24
    },
    copyright: {
        textAlign: 'center',
        color: '#90a0ab',
        fontSize: 10
    }

});

const mapStateToProps = (state) => {
    return {
        chapter: state.chapter,
        hasErrored: state.chapterHasErrored,
        isLoading: state.chapterIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: () => dispatch(fetchBooks()),
        fetchChapter: (chapterId) => dispatch(chapterFetchData(chapterId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BibleScreen);

/**
 * <Header style={styles.header}>
                    <Body style={styles.headerBody}>
                        <Button full transparent dark
                            onPress={this._showChapterSelector}>
                            <Text>
                                <Text style={{color: 'white'}}>{chapter.parent.book.name} </Text>
                                <Text style={{color: 'white'}}>{chapter.chapter}</Text>
                            </Text>
                        </Button>
                    </Body>
                </Header>
 */