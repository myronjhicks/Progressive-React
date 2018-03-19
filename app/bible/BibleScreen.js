import React, { Component, PropTypes } from 'react';
import { StyleSheet, Platform, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
    Container, Header, Title, Left,
    Right, Icon,
    Content, Body, Card, CardItem, Footer, FooterTab
} from 'native-base';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { connect } from 'react-redux';
import { chapterFetchData } from '../redux/actions/chapter';
import { fetchBooks } from '../redux/actions/books';
import HTMLView from 'react-native-htmlview';
import NetworkErrorComponent from '../components/NetworkErrorComponent';
const cheerio = require('react-native-cheerio');
import { fontSize, fontFamily, normalize  } from '../styles/theme';

const forwardIcon = require('../assets/icons/forward_button.png');
const backIcon = require('../assets/icons/back_button.png');

class HeaderTitle extends React.Component {
    render() {
      return (
        <Text key={'headerTitle'} style={styles.headerTitle} onPress={this.props.onPress}>{this.props.title}</Text>
      );
    }
}

class BibleScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitle: <HeaderTitle title={params.headerTitle} onPress={params.showSelector}/>,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#2e2e2e',
            },
        }
      };

    constructor(){
        super();
        this.setTitle = this.setTitle.bind(this);
    }

    setTitle(){
        var parent = this.props.chapter.parent;
        var chapter = this.props.chapter;
        var headerTitle = `${parent.book.name } ${chapter.chapter}`;
        this.props.navigation.setParams({ headerTitle: headerTitle });
    }

    componentDidMount(){
        this.setTitle();
        this.props.navigation.setParams({ showSelector: this._showChapterSelector });
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.props.chapter.id !== nextProps.chapter.id);
    }

    componentDidUpdate(prevProps, prevState){
        this.setTitle();
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
        this.props.navigation.navigate('ChapterSelector', {name: this.props.chapter.parent.book.name});
    };

    _scrollToTop = () => {
        this._scrollView.scrollTo({X: 0,y: 0, animated: true});
    };

    renderChapter(chapter) {
      const $ = cheerio.load(chapter.text);
      var verses = 1;
      var pCount = 1;
      var hCount = 1;
      return (
        <View style={{flex: 1}}>
          {
            $('.chapter').children().map(function(i, elm) {
              if($(elm).hasClass('s')) {
                const headerText = $(elm).text();
                return <Text style={styles.header} key={`h.${hCount++}`}>{headerText}{'\n'}</Text>
              }else if($(elm).hasClass('p')){
                var paragraph = $(elm).children().map(function(idx, span){
                  const key = $(span).children('sup').attr('id');
                  var pText = $(span).text();

                  if(verses > 99){
                    pText = pText.slice(3);
                  }else if(verses > 9){
                    pText = pText.slice(2);
                  }else{
                    pText = pText.slice(1);
                  }

                  return <Text style={styles.p} key={key}>{verses++} {pText}{'\n'}</Text>
                }).get()

                return <Text key={`p.${pCount++}`}>{paragraph}</Text>
              }
            }).get()
          }
        </View>
      )
    }

    render() {
      const { chapter } = this.props;
      return (
        <View style={{flex: 1}}>
            <ScrollView 
                ref={ref => this._scrollView = ref} 
                scrollsToTop
                style={styles.container}>
                { this.renderChapter(chapter) }
            </ScrollView>
            <TouchableOpacity 
                activeOpacity={0.5} 
                onPress={this._previousChapter} style={styles.leftOpacityStyle}>
                <Image source={backIcon} style={styles.floatingButtonStyle} />
            </TouchableOpacity>
            <TouchableOpacity 
                activeOpacity={0.5} 
                onPress={this._nextChapter} style={styles.opacityStyle}>
                <Image source={forwardIcon} style={styles.floatingButtonStyle} />
            </TouchableOpacity>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 12,
        paddingBottom: 30
    },
    headerTitle: {
        fontSize: Platform.OS === 'ios' ? 17 : 20,
        fontWeight: Platform.OS === 'ios' ? '600' : '500',
        color: 'white',
        textAlign: Platform.OS === 'ios' ? 'center' : 'left',
        marginHorizontal: 16,
        padding: 4,
        borderWidth: 0.5,
        borderColor: 'white'
    },
    header: {
        fontSize: fontSize.large + 1,
        fontFamily: fontFamily.bold,
        fontWeight: "600",
    },
    p: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.regular,
        lineHeight: 24
    },
    opacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 12,
        bottom: 20
    },
    leftOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 12,
        bottom: 20
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
    },
});

const mapStateToProps = (state) => {
    return {
        chapter: state.chapter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: () => dispatch(fetchBooks()),
        fetchChapter: (chapterId) => dispatch(chapterFetchData(chapterId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BibleScreen);
