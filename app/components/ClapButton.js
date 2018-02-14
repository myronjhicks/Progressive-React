import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { updateClaps } from '../redux/actions/prayers';

export default class ClapButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      count: props.count ? props.count : 0,
      claps: []
    }
    this.clap = this.clap.bind(this);
    this.keepClapping = this.keepClapping.bind(this);
    this.stopClapping = this.stopClapping.bind(this);
  }

  animationComplete(countNum) {
    claps = this.state.claps;
    claps.splice(claps.indexOf(countNum), 1);
    this.setState({claps});
  }

  clap() {
      let count = this.state.count;
      let claps = this.state.claps;
      count++;
      updateClaps(this.props.postKey, count);
      claps.push(count);
      this.setState({count, claps});
  }

  keepClapping() {
    this.clapTimer = setInterval(() => this.clap(), 150);
  }

  stopClapping() {
    if(this.clapTimer){
      clearInterval(this.clapTimer);
    }
  }

  renderClaps() {
    return this.state.claps.map(countNum =>  <ClapBubble key={countNum} count={countNum} animationComplete={this.animationComplete.bind(this)}/>)
  }

  getClapIcon(){
    if(this.state.count < 1){
      return (
        <Image style={styles.clapIcon}  source={require('../assets/pray.png')} />
      );
    }else{
      return (
        <Image style={styles.clapIcon}  source={require('../assets/prayed.png')} />
      );
    }
  }

  render() {
    let clapIcon = this.getClapIcon();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.clap}
          onPressIn={this.keepClapping}
          onPressOut={this.stopClapping}
          activeOpacity={0.7}
          style={styles.clapButton}>
          { clapIcon }
        </TouchableOpacity>
        {this.renderClaps()}
      </View>
    );
  }
}

export class ClapBubble extends Component {

  constructor(props){
    super(props);
    this.state = {
        yPosition: new Animated.Value(0),
        opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.yPosition, {
        toValue: -120,
        duration: 500
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500
      })
    ]).start(() => {
      setTimeout(() => {
          this.props.animationComplete(this.props.count);
      }, 500);
    });
  }

  render() {
    let animationStyle = {
      transform: [{translateY: this.state.yPosition}],
      opacity: this.state.opacity
    }
    return (
      <Animated.View style={[styles.clapBubble, animationStyle]}>
        <Text style={styles.clapText}>+{this.props.count}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clapButton: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    backgroundColor: '#ecf0f1',
    bottom: 0,
    right: 0,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  clapBubble: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#da9b07',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clapText:{
    color: 'white',
    fontSize: 14
  },
  clapIcon: { height: 30, width: 30 },
});
