import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import { Content, Container } from 'native-base';

class BlogScreen extends Component {

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
          title: "Pastor's Desk",
          headerTintColor: 'white',
          headerStyle: {
              backgroundColor: '#2e2e2e',
          },
      }
    };

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <Image source={require('../assets/blog_banner.jpg')} />
        <Text style={{textAlign: 'center', marginTop: 4, fontWeight: 'bold'}}>{this.props.posts[0].title}</Text>
        <HTML html={this.props.posts[0].body}
          tagsStyles={{
            p: {
              padding: 12
            }
          }}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 12,
    },
    h3: {
        fontSize: 14,
        marginBottom: 8,
    },
    span: {
      fontSize: 24
    }
});

const mapStateToProps = (state) => {
    return {
      posts: state.blogPosts
    };
};
export default connect(mapStateToProps)(BlogScreen);
