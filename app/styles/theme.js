import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const realWidth = (height > width) ? width : height;

const normalize = (fontSize) => {
  return Math.round(fontSize * realWidth / 375);
};

const color = {
  black: 'rgba(0,0,0,.84)',
  lightBlack: '#414141',
  main: 'rgb(99,139,250)',
  white: '#ffffff',
  light_grey: '#eaeaea',
  grey: '#ccc',
  red: 'red'
};

const fontSize = {
  small: normalize(14),
  regular: normalize(15),
  large: normalize(22)
};

const fontFamily = {
  bold: 'RobotoBold',
  medium: 'RobotoMedium',
  regular: 'RobotoRegular',
  light: 'RobotoLight'
};

const padding = 8;
const navBarHeight = (Platform.OS === 'ios') ? 64: 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export {
  color,
  fontSize,
  fontFamily,
  padding,
  navBarHeight,
  windowWidth,
  windowHeight,
  normalize
}
